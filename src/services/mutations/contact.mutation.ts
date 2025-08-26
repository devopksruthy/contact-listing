import { ContactInfo } from "@/type/contact.type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function submitContact (data: ContactInfo) {
  try {
    const res = await axios.post('api/contact',data);
    return res.data
  } catch (error) {
    console.log("error:",error)
  }
}

export function useContactMutation () {
    return useMutation(
        {
            mutationFn : submitContact
        }
    )
}