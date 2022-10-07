import { RefObject, useCallback, useEffect, useState } from "react";
import { toPng } from "html-to-image";

interface UseHTMLToImageProps {
  ref: RefObject<HTMLDivElement>;
}

const useHTMLToImage = ({ ref }: UseHTMLToImageProps) => {
  const [imageData, setImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const convert = useCallback(() => {
    if (ref.current) {
      setLoading((pre) => true);
      toPng(ref.current, { cacheBust: true })
        .then((data) => {
          setImageData(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading((prev) => false);
        });
    }
  }, [ref]);
  return { convert, imageData, imageLoading: loading, setImageData };
};

export default useHTMLToImage;
