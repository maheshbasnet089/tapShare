import {create} from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    send_file : async (file)=>{
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('http://localhost:5000/send_file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);
    }
}))