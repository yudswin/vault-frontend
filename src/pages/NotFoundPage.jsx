import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { AddressBook, Flag } from "@phosphor-icons/react";

const NotFoundPage = () => {
    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <div className="justify-center flex">
                    <Flag size={90} weight="fill" />
                </div>
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mt-10 !text-3xl !leading-snug md:!text-4xl"
                >
                    Error 404 <br /> It looks like something went wrong.
                </Typography>
                <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
                    Don&apos;t worry, our team is already on it.Please try refreshing
                    the page or come back later.
                </Typography>
                <AddressBook size={28} color="#7f2424" weight="thin" />
                <Button color="gray" className="w-full px-4 md:w-[8rem]">
                    back homee
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage