import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Textarea,
  Carousel
} from "@material-tailwind/react";
import clsx from "clsx";

// import { useProduct } from "@/hooks/use-product";

const AddSaaSModal = ({ modalOpen, handleClose }) => {
  // const { data: session } = useSession();
  // const { confirmReload } = useProduct();

  const [open, setOpen] = useState(false);
  const [appName, setAppName] = useState("");
  const [appURL, setAppURL] = useState("");
  const [appStartingPrice, setAppStartingPrice] = useState(0);
  const [amountIncrease, setAmountIncrease] = useState(0);
  const [numberOfSales, setNumberOfSales] = useState(1);
  const [appOverView, setAppOverView] = useState("");

  const [appLogo, setAppLogo] = useState(null);
  const [appLogoCreateObjectURL, setAppLogoCreateObjectURL] = useState(null);
  const [appIntroductionImage, setAppIntroductionImage] = useState(null);
  const [appIntroductionImageCreateObjectURL, setAppIntroductionImageCreateObjectURL] = useState(null);
  const [appCarouselImage, setAppCarouselImage] = useState(null);

  // useEffect(() => {
  //   setOpen(modalOpen);
  // }, [modalOpen])

  const handleAdd = async () => {
    // const o_formData = new FormData();
    // // o_formData.append("app_manager", session?.user.email);
    // o_formData.append("app_name", appName);
    // o_formData.append("app_url", appURL);
    // o_formData.append("app_starting_price", appStartingPrice);
    // o_formData.append("amount_increase", amountIncrease);
    // o_formData.append("sales_number", numberOfSales);
    // o_formData.append("app_overview", appOverView);
    // o_formData.append("app_logo", appLogo);
    // o_formData.append("app_introduction_image", appIntroductionImage);
    // appCarouselImage.forEach((image, index) => {
    //   o_formData.append("app_carousel" + (index + 1), image);
    // })

    // await fetch('/api/product/add_product', {
    //   method: "POST",
    //   body: o_formData
    // });

    // // await confirmReload(true);
    // initialize();
  }

  const handleCancel = () => {
    initialize();
  }

  // const initialize = () => {
  //   setAppName("");
  //   setAppURL("");
  //   setAppStartingPrice(0);
  //   setAmountIncrease(0);
  //   setNumberOfSales(1);
  //   setAppOverView("");
  //   setAppLogo(null);
  //   setAppLogoCreateObjectURL(null);
  //   setAppIntroductionImage(null);
  //   setAppIntroductionImageCreateObjectURL(null);
  //   setAppCarouselImage(null);
  //   handleClose(!open);
  // }

  return (
    <Dialog open={open} size="xs" handler={handleCancel}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Add new SaaS product
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5 cursor-pointer"
          onClick={handleCancel}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <DialogBody className="overflow-y-auto max-h-[70vh]">
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={handleCancel}>
          cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddSaaSModal;