import { Digital } from "react-activity"

interface propType{
    loading:boolean
}

const NoReview = ({loading}:propType)=>{
    return(
        <div className='text-2xl w-full flex justify-center font-semibold text-muted'>
            {loading?(
                <Digital size={30} color="#373f51" />
            ):(
                <p>No Reviews Available</p>
            )}
            
        </div>
    )
}

export default NoReview