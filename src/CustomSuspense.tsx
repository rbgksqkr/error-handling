import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";

interface CustomSuspenseProps {
  fallback: ReactNode;
}

const CustomSuspense = ({
  fallback,
  children,
}: PropsWithChildren<CustomSuspenseProps>) => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePromise = useCallback(() => {
    try {
      setIsLoading(false);
    } catch (promise) {
      if (promise instanceof Promise) {
        promise.then(() => setIsLoading(false));
      } else {
        throw promise;
      }
    }
  }, []);

  useEffect(() => {
    handlePromise();
  }, [handlePromise]);

  if (isLoading) return <>{fallback}</>;

  return <>{children}</>;
};

export default CustomSuspense;
