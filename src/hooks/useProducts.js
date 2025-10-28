import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api'


export default function useProducts(){
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(()=>{
let mounted = true
fetchAllProducts()
.then(data=>{ if(mounted){ setProducts(data) }})
.catch(err=>{ if(mounted){ setError(err); console.error(err) }})
.finally(()=>{ if(mounted) setLoading(false) })
return ()=> mounted = false
},[])


return { products, loading, error }
}