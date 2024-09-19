type Status = "pending" | "fulfilled" | "rejected";

interface PromiseProps<T> extends Promise<T> {
  status?: Status;
  value?: T;
  reason?: string;
}

interface PromiseResult<T> {
  status: Status;
  value?: T;
  reason?: string;
}

const readPromiseState = <T>(promise: PromiseProps<T>): PromiseResult<T> => {
  switch (promise.status) {
    case "pending":
      return { status: "pending" };
    case "fulfilled":
      return { status: "fulfilled", value: promise.value };
    case "rejected":
      return { status: "rejected", reason: promise.reason };
    default:
      promise.status = "pending";
      promise.then((value) => {
        promise.status = "fulfilled";
        promise.value = value;
      });
      promise.catch((reason) => {
        promise.status = "rejected";
        promise.reason = reason;
      });
      return readPromiseState(promise);
  }
};

export default readPromiseState;
