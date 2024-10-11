"use client"; // Make sure to use "use client" if you're in a file that needs client-side rendering

const Bill = () => {
  return (
    <div className="overflow-y-auto h-screen">
        <div className="flex flex-col bg-[#fffff] h-full min-h-[100vh] p-8">
        <h1 className="text-2xl text-center mb-4">Tax Invoice</h1>
        <p className="font-bold">
            Sold by: Jeeves Consumer Services Private Limited,
        </p>
        <p className="italic">
            <b>Ship From Address: </b>
            <span>L-169, 13th Cross Road, 5th Main, Sector - 6, HSR Layout</span>
        </p>
        <p>
            <b>GSTIN</b> - 29AABCJ9421C1ZP
        </p>

        <hr className="border-2 border-black mt-2" />

        <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col space-y-2">
            <p className="font-bold">Order ID:</p>
            <p className="font-bold">OD32977858121675647858</p>
            <p><b>Order Date:</b> 27-11-2023</p>
            <p><b>Invoice Date:</b> 27-11-2023</p>
            <p><b>PAN:</b>AABCJ9421C</p>
            </div>

            <div className="flex flex-col space-y-1">
            <p className="font-bold">Bill To</p>
            <p className="font-bold">Shailesh Mane</p>
            <p>134, Somvar Peth, Karad</p>
            <p>Opposite to Kanya Shala, near</p>
            <p>Sulochana Coaching Classes,</p>
            <p>Karad.</p>
            <p>Karad 415110 Maharashtra</p>
            <p>Phone: XXXXXXXXXX</p>
            </div>

            <div className="flex flex-col space-y-1">
            <p className="font-bold">Ship To</p>
            <p className="font-bold">Shailesh Mane</p>
            <p>134, Somvar Peth, Karad</p>
            <p>Opposite to Kanya Shala, near</p>
            <p>Sulochana Coaching Classes,</p>
            <p>Karad.</p>
            <p>Karad 415110 Maharashtra</p>
            <p>Phone: XXXXXXXXXX</p>
            </div>

            <div className="flex flex-col justify-center items-center h-full">
            <p className="italic text-center">
                *Keep this invoice<br />
                and manufacturer box<br />
                for warranty purposes
            </p>
            </div>

            {/* <div>Total items : 1</div> */}
        </div>

        <div>Total items : 1</div>
        <hr className="border-2 border-black mt-4" />


        <div className="mt-8">
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="p-2 font-bold text-left" style={{ width: '20%' }}>Product</th>
                    <th className="p-2 font-bold text-left" style={{ width: '20%' }}>Title</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>Qty</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>Gross Amount Rs</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>Discounts/ Coupons Rs</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>Taxable Value Rs</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>IGST Rs</th>
                    <th className="p-2 font-bold text-left" style={{ width: '10%' }}>Total Rs</th>
                </tr>
                <tr>
                    <td colSpan="8">
                    <hr className="border-0" style={{ height: '1.5px', backgroundColor: 'black' }} />
                    </td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">Data 1</td>
                        <td className="p-2">
                        <b>Spotify Premium - 3M at Rs 119</b><br />
                        <b>IGST:</b> 18.0%
                        </td>
                        <td className="p-2">1</td>
                        <td className="p-2">1.00</td>
                        <td className="p-2">-1.00</td>
                        <td className="p-2">0.00</td>
                        <td className="p-2">0.00</td>
                        <td className="p-2">0.00</td>
                    </tr>
                    
                    <tr>
                        <td colSpan="1"></td>
                        <td colSpan="7">
                        <hr className="border-0" style={{ height: '1.5px', backgroundColor: 'black' }} />
                        </td>
                    </tr>

                    <tr className="font-bold">
                        <td className="p-2"></td>
                        <td className="p-2">Total</td>
                        <td className="p-2">1</td>
                        <td className="p-2">1.00</td>
                        <td className="p-2">-1.00</td>
                        <td className="p-2">0.00</td>
                        <td className="p-2">0.00</td>
                        <td className="p-2">0.00</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr className="border-2 border-black mt-4" />
        <div className="flex flex-col text-end h-full">
            <div className="mt-8">
                <div className="text-lg">
                    <span>Grand Total</span>
                    <span className="font-bold text-xl ml-12">₹ 100.00</span> {/* Added margin for spacing */}
                </div>
                <div className="text-end mt-2 leading-tight"> {/* Adjust line height with leading-tight */}
                    <p>Jeeves Consumer Services Private Limited</p>
                    {/* <img src="path/to/your/image.png" alt="Logo" className="mx-auto my-2" />  */}
                    <p className="mt-2">Authorized Signatory</p> {/* Reduced margin to 2 */}
                </div>
            </div>
        </div>

        <hr className="border border-black mt-4" />
        </div>
    </div>
  );
};

export default Bill;





