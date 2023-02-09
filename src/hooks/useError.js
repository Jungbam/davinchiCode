import { useNavigate } from "react-router-dom";

export const useError = () => {
  const navigate = useNavigate();
  const errorHandler = (error) => {
    switch (error?.response.status) {
      case 401:
        navigate("/");
        break;
      case 400:
        alert(
          "로그인 정보가 올바르지 않습니다. 원활한 이용을 위해 로그인을 다시 해주시기 바랍니다."
        );
        navigate("/intro");
        break;
      default:
        navigate("/error");
        break;
    }
  };
  return errorHandler;
};
