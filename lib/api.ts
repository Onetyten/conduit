import { store } from "@/store";

type FetchOptions = RequestInit & {
    params?:Record<string,string>
}

const apiClient = async (endpoint:string,options:FetchOptions={})=>{
    const {params,...fetchOptions} = options
    const state = store.getState()
    const token = state.user.token
    const headers = new Headers(fetchOptions.headers)
    if (token){
        headers.set('Authorization',`Bearer ${token}`)
    }

    const url = new URL(endpoint,process.env.NEXT_PUBLIC_API_URL)
    if (params){
        Object.entries(params).forEach(([key,value])=>url.searchParams.set(key,value))
    }

    const res = await fetch(url.toString(),{...fetchOptions,headers})
    if (!res.ok) throw new Error(await res.text())
    return res.json()
}

apiClient.get  = (url: string, opts?: FetchOptions) => apiClient(url, { ...opts, method: 'GET' })

apiClient.post = (url: string, body: unknown, opts?: FetchOptions) =>
  apiClient(url, { 
    ...opts, method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json',
    ...opts?.headers }
  }
)

apiClient.put = (url: string, body: unknown, opts?: FetchOptions) =>
  apiClient(url, { ...opts,
    method: 'PUT',
    body: JSON.stringify(body) }
)

apiClient.patch = (url: string, body: unknown, opts?: FetchOptions) =>
  apiClient(url, { ...opts,
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...opts?.headers }
}

)

apiClient.delete = (url: string, opts?: FetchOptions) => apiClient(url, { ...opts, method: 'DELETE' })


export default apiClient