const PrintBillModal = ({ bill, isOpen, onClose }) => {
  if (!isOpen || !bill) return null;

  const printBill = () => {
    window.print();
  };

  // Convert bill.amount to a number to ensure numeric operations work correctly
  const amount = Number(bill.amount) || 0;
  const igst = amount * 0.18;
  const total = amount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto h-screen">
        <h1 className="text-2xl text-center mb-4">Bill Invoice</h1>
        <p className="font-bold">Sold by: ScribeON Private Limited,</p>
        <p className="italic">
          <b>Ship From Address: </b>
          <span>
            12, Ebenezer church road, Silicon town, Electronic city phase 2,
            Bangalore 560099
          </span>
        </p>
        <p>
          <b>GSTIN</b> - Not available right now
        </p>

        <hr className="border-2 border-black mt-2" />

        <div className="grid grid-cols-4 gap-16 mt-4">
          <div className="flex flex-col space-y-2">
            <p className="font-bold">Order ID:</p>
            <p className="font-bold">{bill.id}</p>
            <p>
              <b>Order Date:</b> {bill.date}
            </p>
            <p>
              <b>Invoice Date:</b> {new Date().toLocaleDateString()}
            </p>
            <p>
              <b>PAN:</b> MADPS0944Q
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="font-bold">Bill From</p>
            <p className="font-bold">ScribeON Private Limited</p>
            <p>
              <span className="font-bold">Address:</span> 12, Ebenezer church
              road, Silicon town, Electronic city phase 2, Bangalore 560099{" "}
            </p>
            <p>
              <span className="font-bold">Phone:</span> +917276766478,
              +917620693246
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="font-bold">Bill To</p>
            <p className="font-bold">{bill.clientName}</p>
            <p>
              <span className="font-bold">Address:</span>{" "}
              {bill.address || "7404 Airline Dr. Suite G. Houston, Texas 77076"}
            </p>
            <p>
              <span className="font-bold">Phone:</span>{" "}
              {bill.phone || "+1832-645-0004, +1713-401-4905"}
            </p>
          </div>
        </div>

        <hr className="border-2 border-black mt-4" />

        <div className="mt-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 font-bold text-left">Product</th>
                <th className="p-2 font-bold text-left">Qty</th>
                <th className="p-2 font-bold text-left">Gross Amount $</th>
                <th className="p-2 font-bold text-left">Discounts/Coupons $</th>
                <th className="p-2 font-bold text-left">Taxable Value $</th>
                {/* <th className="p-2 font-bold text-left">IGST $</th> */}
                <th className="p-2 font-bold text-left">Total $</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Medical Scribing service</td>
                <td className="p-2">1</td>
                <td className="p-2">{amount.toFixed(2)}</td>
                <td className="p-2">0.00</td>
                <td className="p-2">{amount.toFixed(2)}</td>
                {/* <td className="p-2">{igst.toFixed(2)}</td> */}
                <td className="p-2">{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="border-2 border-black mt-6" />

        <Image src={PrintIcon} className="absalute" alt="signature" width={50} height={50} />

        <button
          onClick={printBill}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Print Bill
        </button>
        <button
          onClick={onClose}
          className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};