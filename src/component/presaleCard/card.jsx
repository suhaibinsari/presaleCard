
export default function card() {
    return (
        <>
            <div className="flex text-center items-center justify-center ">

                <div className=" bg-red-200 rounded-xl mx-auto px-48 space-y-4 p-10">
                    <h className="font-bold text-4xl">ABC Chain</h>
                    <p>Phase 1 Ends in:</p>

                    <div className="flex gap-4">
                        <span className="flex gap-2">
                            <p>29</p>
                            <p>Days</p>
                        </span>
                        <span className="flex gap-2">
                            <p>19</p>
                            <p>Hours</p>
                        </span>
                        <span className="flex gap-2">
                            <p>35</p>
                            <p>Minutes</p>
                        </span>
                        <span className="flex gap-2">
                            <p>22</p>
                            <p>Seconds</p>
                        </span>
                    </div>

                    <progress id="file" value="32" max="100"> 32% </progress>

                    <p>USD RAISED = $00000/ 000000</p>
                    <p>Minimum purchase = 5000 INCO</p>
                    <p>1 INCO = $0.0001</p>
                    <p>Listing Price: TDB</p>

                    <div className="flex gap-6">
                        <button className=" rounded-xl p-4 px-16 bg-yellow-600 text-white">BNB</button>
                        <button className=" rounded-xl p-4 px-16 bg-green-700 text-white">USDT</button>
                    </div>

                    <div className="flex items-start justify-start flex-col">
                        <p>Amount in <span className="font-bold">BNB </span>you pay:</p>
                        <input type="text" name="" id=""  className="w-full rounded-md p-2"/>
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <p>Amount in <span className="font-bold">ABC </span>you receive:</p>
                        <input type="text" name="" id=""  className="w-full rounded-md p-2"/>
                    </div>



                    <button className=" rounded-xl p-4 px-16 bg-green-700 text-white">Connect Wallet</button>

                </div>
            </div>
        </>
    )
}
