import { useNavigate } from "react-router-dom";

import { LeftArrowIcon } from "@shared/ui/icons";

export const BackButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };
  return (
    <button onClick={onClick}>
      <LeftArrowIcon size="sm" className="text-overlay1 active:text-overlay2" />
    </button>
  );
};
