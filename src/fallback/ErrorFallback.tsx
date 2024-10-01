const ErrorFallback = ({ error }: { error: string }) => {
  return (
    <div>
      <h1>에러 발생</h1>
      <h2>에러 메세지 : {error}</h2>
    </div>
  );
};

export default ErrorFallback;
