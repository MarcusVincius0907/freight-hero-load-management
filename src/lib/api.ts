import { Load } from "@/types/load"

export const fetchLoads = async (): Promise<Load[]> => {
    await new Promise(res => setTimeout(res, 1000))
    const res = await fetch('/loads-mock.json')
    if (!res.ok) throw new Error('Failed to fetch loads')
    const data = await res.json()
    return data.loads;
}