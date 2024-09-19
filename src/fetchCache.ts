import readPromiseState from "./utils/readPromiseState";

class FetchCache {
  // 모든 요청을 위한 컨테이너
  requestMap = new Map();

  // 상태 업데이트의 브로드캐스팅을 위한 콜백 추적
  subscribers = new Set();

  fetchUrl(url: string, refetch: boolean) {
    const currentData = this.requestMap.get(url);

    if (currentData) {
      // 이 요청은 이미 진행 중입니다.
      if (readPromiseState(currentData).status === "pending") {
        return readPromiseState(currentData);
      }
      // 데이터가 이미 캐시에 있고 명시적으로 다시 요청되지 않은 경우 currentData를 반환함
      // 상태는 완료(fulfilled)되었거나 거부(rejected)된 것으로 처리
      if (!refetch) return readPromiseState(currentData);
    }

    // 경쟁 요청을 피하려고 상태를 보류 중으로 설정
    const pendingState = { status: "pending" };
    this.requestMap.set(url, pendingState);

    const broadcastUpdate = () => {
      // 실행하지 않기 위해 알림 지연
      // 렌더링 주기 중
      // https://reactjs.org/link/setstate-in-render
      setTimeout(() => {
        for (const callback of this.subscribers) {
          callback();
        }
      }, 0);
    };

    // 요청을 dispatch하고 관찰하기
    const newPromise = fetch(url).then((res) => res.json());

    newPromise.finally(() => {
      // 어떤 일이 발생하던 구독자에게 알립니다.
      // 해당 상태를 새로 고쳐야 합니다.
      broadcastUpdate();
    });

    this.requestMap.set(url, newPromise);

    // 요청이 현재 보류 중임을 보고합니다.
    broadcastUpdate();

    // 요청이 현재 보류 중임을 보고합니다.
    return readPromiseState(newPromise);
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}

export default FetchCache;
