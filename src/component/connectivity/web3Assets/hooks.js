// import { useWaitForTransaction } from "@wagmi/core";
import { readContract, writeContract, waitForTransaction } from "wagmi/actions";
import tokenAbi from './tokenAbi.json'
import presaleAbi from './presaleAbi.json'
import usdtAbi from './usdtAb.json'
import { tokenAddress, usdtAddress, presaleAddress } from "./environment";




export const tokenReadFunction = async (functionName, args) => {
    const data = await readContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName,
        args
    })
    return data
}

export const usdtReadFunction = async (functionName, args) => {
    const data = await readContract({
        address: usdtAddress,
        abi: usdtAbi,
        functionName,
        args
    })
    return data
}

export const presaleReadFunction = async (functionName, args) => {
    const data = await readContract({
        address: presaleAddress,
        abi: presaleAbi,
        functionName,
        args
    })
    return data
}


// write hooks/functions

export const tokenWriteFunction = async (functionName, args) => {
    const { hash } = await writeContract({
        address: tokenAddress,
        abi: tokenAbi,
        functionName,
        args
    })
    const receipt = await waitForTransaction({ hash })
    return receipt
}

export const usdtWriteFunction = async (functionName, args) => {
    const { hash } = await writeContract({
        address: usdtAddress,
        abi: usdtAbi,
        functionName,
        args
    })
    const receipt = await waitForTransaction({ hash })
    return receipt
}

export const presaleWriteFunction = async (functionName, args,value) => {
    const {hash} = await writeContract({
        address: presaleAddress,
        abi: presaleAbi,
        functionName,
        args,
        value
    })
    const receipt = await waitForTransaction({hash})
    return receipt
}