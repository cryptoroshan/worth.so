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
    <Button>Button</Button>
  );
}

export default AddSaaSModal;