import { toast } from "react-toastify";

const commonError = "OOPS! Something went wrong!";

const toastList = new Set();
const MAXIMUM_TOAST = 4;

export const Alert = (type: number, message: string = commonError) => {
  switch (type) {
    case 1: {
      if (toastList.size < MAXIMUM_TOAST) {
        const id: any = toast.success(message, {
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
      break;
    }
    case 2: {
      if (toastList.size < MAXIMUM_TOAST) {
        const id: any = toast.error(message, {
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
      break;
    }
    case 3: {
      if (toastList.size < MAXIMUM_TOAST) {
        const id: any = toast.info(message, {
          onClose: () => toastList.delete(id),
        });
        toastList.add(id);
      }
      break;
    }
  }
};
