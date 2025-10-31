export default function CategoryHeader({name}){
return (
<div className="flex items-center gap-4 my-6">
<div className="w-1.0 h-8 bg-black/80 rounded" />
<h2 className="text-2xl font-semibold uppercase text-gray-100">{name}</h2>
</div>
)
}