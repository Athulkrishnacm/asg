import axiosInstance from "../axios/axiosInstance";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url, dependency){
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source()
        let isMounted = true
        axiosInstance.get(url,{
            cancelToken: source.token
        }).then((response) => {
            setError(null)
            setData(response?.data?.data)
        }).catch((error) => {
            if(error.response){
                return setError(error?.response?.data?.error)
            }
            setError(error)
        }).finally(() => {
            if(isMounted){
                setLoading(false)
            }
        })
        return () => {
            isMounted = false;
            source.cancel("Request cancelled by user")
        }
    }, [...(dependency ?? [])])


    return [ data, error, loading ];
}