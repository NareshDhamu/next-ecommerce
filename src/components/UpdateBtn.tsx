"use client"

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className='bg-narsa cursor-pointer text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96'>
            {pending ? "Updating..." : "Update"}
        </button>
    );
}

export default UpdateButton;