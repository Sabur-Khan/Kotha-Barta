import Friends from "../../Components/Friends/Friends"
import MyGroups from "../../Components/MyGroups/MyGroups"
import SaideBar from "../../Components/SideBar/SaideBar"


const Message = () => {
  return (
    <div>
        <div className='max-w-[1440px] lg:mt-0 md:mt-10 mt-10 lg:mb-0 md:mb-10 mb-11 lg:h-full w-full mx-auto py-2 lg:px-[20px] md:px-3 px-3 bg-white shadow-md rounded-xl flex lg:gap-[40px]'>
        
            <div>
            <SaideBar/>
            </div>
        
            <div className='w-full flex justify-between gap-4'>
                <div className=" w-1/2">

                    <div>
                        <MyGroups/>
                    </div>
                    <div className="mt-5">
                        <Friends/>
                    </div>
                </div>


            
                <div className="w-1/2">
                    <div className="w-full h-[900px] shadow-lg bg-white rounded-[20px] border py-[24px] px-[15px] overflow-y-auto">
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Message