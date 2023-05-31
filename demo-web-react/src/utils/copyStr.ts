import toast from "react-hot-toast"

export async function copyText(str: string){

    try {
        await navigator.clipboard.writeText(str)
            
        toast.success('Success to copy encoded text!', {
            position: "top-right"
        })
    } 
    catch (error) {
        toast.error('Failed to copy encoded text!', {
            position: "top-right"
        })
    }

}