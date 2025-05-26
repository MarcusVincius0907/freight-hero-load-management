import { toast } from "@/hooks/use-toast"
import { Load } from "@/types/load"

export const fetchLoads = async (): Promise<Load[]> => {
    try{
        await new Promise(res => setTimeout(res, 1000))
        const res = await fetch('/loads-mock.json')
        if (!res.ok) throw new Error('Failed to fetch loads')
        const data = await res.json()
        return data.loads;
    } catch (error) {
        console.error('Error fetching loads:', error)
        toast({title: 'Failed to fetch loads'})
        return []
    }

}