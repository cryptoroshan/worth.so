import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
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

  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen])

  const handleAdd = async () => {
    const o_formData = new FormData();
    // o_formData.append("app_manager", session?.user.email);
    o_formData.append("app_name", appName);
    o_formData.append("app_url", appURL);
    o_formData.append("app_starting_price", appStartingPrice);
    o_formData.append("amount_increase", amountIncrease);
    o_formData.append("sales_number", numberOfSales);
    o_formData.append("app_overview", appOverView);
    o_formData.append("app_logo", appLogo);
    o_formData.append("app_introduction_image", appIntroductionImage);
    appCarouselImage.forEach((image, index) => {
      o_formData.append("app_carousel" + (index + 1), image);
    })

    await fetch('/api/product/add_product', {
      method: "POST",
      body: o_formData
    });

    // await confirmReload(true);
    initialize();
  }

  const handleCancel = () => {
    initialize();
  }

  const initialize = () => {
    setAppName("");
    setAppURL("");
    setAppStartingPrice(0);
    setAmountIncrease(0);
    setNumberOfSales(1);
    setAppOverView("");
    setAppLogo(null);
    setAppLogoCreateObjectURL(null);
    setAppIntroductionImage(null);
    setAppIntroductionImageCreateObjectURL(null);
    setAppCarouselImage(null);
    handleClose(!open);
  }

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
        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
          Please add your SaaS product.
        </Typography>
        <div className="grid gap-6">
          <Input label="App Name" value={appName} onChange={(e) => setAppName(e.target.value)} />
          <Input label="App URL" value={appURL} onChange={(e) => setAppURL(e.target.value)} />
          <Input type="number" label="App Starting Price" value={appStartingPrice} onChange={(e) => setAppStartingPrice(Number(e.target.value))} />
          <Input type="number" label="Amount increase" value={amountIncrease} onChange={(e) => setAmountIncrease(Number(e.target.value))} />
          <Input type="number" label="Number of sales" value={numberOfSales} onChange={(e) => setNumberOfSales(Number(e.target.value))} />
          <Textarea label="Overview" value={appOverView} onChange={(e) => setAppOverView(e.target.value)} />
          {/** App Logo Image */}
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue">
              <img className={appLogoCreateObjectURL === "" ? "hidden" : ""} src={appLogoCreateObjectURL} alt="" />
              <svg className={clsx("w-8 h-8", appLogoCreateObjectURL === null ? "" : "hidden")} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className={clsx("mt-2 text-base leading-normal", appLogoCreateObjectURL === null ? "" : "hidden")}>Select a logo</span>
              <input type='file' className="hidden" accept="image/*" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAppLogo(e.target.files[0]);
                  setAppLogoCreateObjectURL(URL.createObjectURL(e.target.files[0]));
                }
              }} />
            </label>
          </div>
          {/** App Introduction Image */}
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue">
              <img className={appIntroductionImageCreateObjectURL === "" ? "hidden" : ""} alt="" src={appIntroductionImageCreateObjectURL} />
              <svg className={clsx("w-8 h-8", appIntroductionImageCreateObjectURL === null ? "" : "hidden")} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className={clsx("mt-2 text-base leading-normal", appIntroductionImageCreateObjectURL === null ? "" : "hidden")}>Select a image</span>
              <input type='file' className="hidden" accept="image/*" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAppIntroductionImage(e.target.files[0]);
                  setAppIntroductionImageCreateObjectURL(URL.createObjectURL(e.target.files[0]));
                }
              }} />
            </label>
          </div>
          {/** App Carousel Image */}
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label className="w-64 h-64 flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue">
              <svg className={clsx("w-8 h-8", appCarouselImage === null ? "" : "hidden")} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className={clsx("mt-2 text-base leading-normal", appCarouselImage === null ? "" : "hidden")}>Select Carousel Images</span>
              <input type='file' className="hidden" accept="image/*" multiple onChange={(e) => {
                if (e.target.files) {
                  //convert `FileList` to `File[]`
                  const _files = Array.from(e.target.files);
                  setAppCarouselImage(_files);
                }
              }} />
              <Carousel loop className={clsx("rounded-xl min-h-full", appCarouselImage === null ? "hidden" : "")}>
                {appCarouselImage !== null && (
                  appCarouselImage.map((item, index) => {
                    return (
                      <img
                        key={index}
                        alt=""
                        src={URL.createObjectURL(item)}
                        className="h-full w-full object-cover"
                      />
                    )
                  })
                )}
              </Carousel>
            </label>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={handleCancel}>
          cancel
        </Button>
        <Button variant="gradient" color="gray" onClick={() => handleAdd()} disabled={appName === "" || appURL === "" || appStartingPrice === 0 || appOverView === "" || appLogo === null || appIntroductionImage === null || appCarouselImage === null ? true : false}>
          add
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddSaaSModal;