import CreateInvoiceCleint from "@/components/CreateInvoiceClient"




const getCustomerbyID = async (id) => {
  try{
      const res = await fetch(`http://localhost:8080/invoice/${id}`, {
          cache: "no-store"
      })

      if(!res.ok){
          throw new Error("failed to fetch the vendor")
      }
      return res.json()
  }catch(error){
      console.log("failed to fetch the vendor", error)
  }
}









const createInvoice = async ({ params }) => {
    try {
        const { id } = params;
        const customer = await getCustomerbyID(id);
        
        // Check if 'customer' is defined before attempting to destructure
        if (!customer) {
            throw new Error("Customer data is undefined");
        }

        // Destructure the 'customer' property and then access the 'company' property
        const { company } = customer;

        return (
            <div className="flex flex-col gap-8 pl-[6rem] py-11">
                <h1 className="text-3xl font-semibold text-green-900">Create Invoice for : {company}</h1>
                <CreateInvoiceCleint company = {company}/>
            </div>
        );
    } catch (error) {
        console.log("Failed to fetch the customer", error);
    }
};

export default createInvoice;
