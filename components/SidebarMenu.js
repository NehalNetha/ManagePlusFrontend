"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import BadgeIcon from '@mui/icons-material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';


import { useState } from 'react';

function SidebarMenu() {
      const pathname = usePathname()
      const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
      const [customers, setCustomers] = useState(false)
      const [vendorsDropDownOpen, setVendorsDropDownOpen] = useState(false)
      const [invoiceDropDownOpen, setInvoiceDropDownOpen]= useState(false)
      const [purchaseOrder, setPurchaseOrder] = useState(false)
      const [expensesDropDownOpen, setExpensesDropDownOpen] = useState(false)
      const [payrollDropDownOpen, setPayrollDropDownOpen] = useState(false)
      const [inventory, setInventory] = useState(false)


      const isActive = (href) => {
      return pathname === href
      }

      return (
            <div className="w-[19rem] border-r-2 border-gray-200 h-full">
                  <div className="flex flex-col justify-start pl-11 ">
                        <p className="  pt-9 pb-6 text-[1.8rem] font-semibold">MangePlus</p>
                        <span className="w-[14rem] border-b-[2px] border-t-gray-300 "></span>
                  </div>

                  <div>
                        
                        <div className="ml-2 mt-[2rem] flex flex-col gap-4">
                              <div className="flex flex-col gap-1">
                                     <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/home') ? "bg-black text-white" : "bg-white text-black"}`}
                                                
                                          >
                                          <HomeIcon className="pb-1" />
                                          <Link href="/home"> Home</Link>
                                    </div>
                                   
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md "bg-black text-white" "bg-white text-gray-600"`}
                                                onClick={() => setEmployeeDropdownOpen(!employeeDropdownOpen)}
                                          >
                                          <BadgeIcon className="pb-1" />
                                          <span>Employees</span>
                                          {employeeDropdownOpen ? <ExpandLessIcon className="text-[1.6rem] ml-[2.5rem]"  /> : <ExpandMoreIcon  className="text-[1.6rem] ml-[2.5rem] " />}
                                    </div>
                                    {employeeDropdownOpen && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/addEmployee') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <BadgeIcon className="pb-1" />
                                                <Link href="/addEmployee">Add Employee</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/employees') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <BadgeIcon className="pb-1" />
                                                <Link href="/employees">View Employees</Link>
                                          </div>
                                          
                                    </div>
                                    )}
                              </div>
                             
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setCustomers(!customers)}
                                          >
                                          <GroupsIcon className="pb-1" />
                                          <span>Customers</span>
                                          {customers ? <ExpandLessIcon className="text-[1.6rem] ml-[2.5rem]" /> : <ExpandMoreIcon className="text-[1.6rem] ml-[2.5rem]" />}
                                    </div>
                                    {customers && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/addCustomers') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <GroupsIcon className="pb-1" />
                                                <Link href="/addCustomers">Add Customers</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/customers') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <GroupsIcon className="pb-1" />
                                                <Link href="/customers">View Customers</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row items-center gap-3  py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setVendorsDropDownOpen(!vendorsDropDownOpen)}
                                          >
                                          <LocalShippingIcon className="pb-1" />
                                          <span>Vendors</span>
                                          {vendorsDropDownOpen ? <ExpandLessIcon className="text-[1.6rem] ml-[3.6rem]"/> : <ExpandMoreIcon className="text-[1.6rem] ml-[3.6rem]"/>}
                                    </div>
                                    {vendorsDropDownOpen && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/addVendors') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <LocalShippingIcon className="pb-1" />
                                                <Link href="/addVendors">Add Vendors</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/vendors') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <LocalShippingIcon className="pb-1" />
                                                <Link href="/vendors">View Vendors</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setPayrollDropDownOpen(!payrollDropDownOpen)}
                                          >
                                          <GroupsIcon className="pb-1" />
                                          <span>Payrolls</span>
                                          {payrollDropDownOpen ? <ExpandLessIcon className="text-[1.6rem] ml-[3.8rem]" /> : <ExpandMoreIcon className="text-[1.6rem] ml-[3.8rem]" />}
                                    </div>
                                    {payrollDropDownOpen && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/payrolls') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <GroupsIcon className="pb-1" />
                                                <Link href="/payEmployee">Pay Employees</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/viewPayrolls') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <GroupsIcon className="pb-1" />
                                                <Link href="/viewPayrolls">View Payrolls</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setInvoiceDropDownOpen(!invoiceDropDownOpen)}
                                          >
                                          <ReceiptLongIcon className="pb-1" />
                                          <span>Invoice</span>
                                          {invoiceDropDownOpen ? <ExpandLessIcon className="text-[1.6rem] ml-[4.2rem]" /> : <ExpandMoreIcon className="text-[1.6rem] ml-[4.2rem]" />}
                                    </div>
                                    {invoiceDropDownOpen && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/invoices/createInvoice') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <ReceiptLongIcon className="pb-1" />
                                                <Link href="/invoices/createInvoice">Create Invoice</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/invoices/viewInvoice') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <ReceiptLongIcon className="pb-1" />
                                                <Link href="/invoices/viewInvoice">View Invoices</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setPurchaseOrder(!purchaseOrder)}
                                          >
                                          <ShopTwoIcon className="pb-1" />
                                          <span>Purchase Order</span>
                                          {purchaseOrder ? <ExpandLessIcon className="text-[1.6rem] ml-[2rem]"/> : <ExpandMoreIcon className="text-[1.6rem] ml-[2rem]"/>}
                                    </div>
                                    {purchaseOrder && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/purchaseOrder/createPO') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <ShopTwoIcon className="pb-1" />
                                                <Link href="/purchaseOrder/createPO">Create PO</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/purchaseOrder/viewPO') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <ShopTwoIcon className="pb-1" />
                                                <Link href="/purchaseOrder/viewPO">View PO</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setExpensesDropDownOpen(!expensesDropDownOpen)}
                                          >
                                          <AttachMoneyIcon className="pb-1" />
                                          <span>Expenses</span>
                                          {expensesDropDownOpen ? <ExpandLessIcon className="text-[1.6rem] ml-[2.8rem]"/> : <ExpandMoreIcon className="text-[1.6rem] ml-[2.8rem]"/>}
                                    </div>
                                    {expensesDropDownOpen && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/expenses/createExpense') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <AttachMoneyIcon className="pb-1" />
                                                <Link href="/expenses/createExpense">View Expenses</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/expenses/viewExpenses') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <AttachMoneyIcon className="pb-1" />
                                                <Link href="/expenses/viewExpenses">View Paid Expenses</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md  "bg-black text-white" : "bg-white text-gray-600"`}
                                                onClick={() => setInventory(!inventory)}
                                          >
                                          <InventoryIcon className="pb-1" />
                                          <span>Inventory</span>
                                          {inventory ? <ExpandLessIcon className="text-[1.6rem] ml-[2.8rem]"/> : <ExpandMoreIcon className="text-[1.6rem] ml-[2.8rem]"/>}
                                    </div>
                                    {inventory && (
                                    <div className="ml-2">
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/inventory/createInventory') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <InventoryIcon className="pb-1" />
                                                <Link href="/inventory/createInventory">Create Inventory</Link>
                                          </div>
                                          <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/inventory/viewInventory') ? "bg-black text-white" : "bg-white text-gray-600"}`}>
                                                <InventoryIcon className="pb-1" />
                                                <Link href="/inventory/viewInventory">View Inventory</Link>
                                          </div>
                                    </div>
                                    )}
                              </div>
                              {/* <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/inventory/viewInventory') ? "bg-black text-white" : "bg-white text-gray-600"}`}
                                          
                                          >
                                          <Link href="/inventory/viewInventory" className="flex flex-row gap-3">
                                                <InventoryIcon className="pb-1" />
                                                <span>Inventory</span>
                                          </Link>
                                          
                                    </div>
                              </div> */}
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/incomeStatement') ? "bg-black text-white" : "bg-white text-gray-600"}`}
                                          
                                          >
                                          <Link href="/incomeStatement" className="flex flex-row gap-3">
                                                <FileCopyIcon className="pb-1" />
                                                <span>Income Statement</span>
                                          </Link>
                                          
                                    </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                    <div className={`flex flex-row gap-3 py-3 pl-7 pr-[3.5rem] m-2 rounded-[4rem] text-md ${isActive('/balanceSheet') ? "bg-black text-white" : "bg-white text-gray-600"}`}
                                          
                                          >
                                          <Link href="/balanceSheet" className="flex flex-row gap-3">
                                                <AccountBalanceIcon className="pb-1" />
                                                <span>Balance Sheet</span>
                                          </Link>
                                          
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}


export default SidebarMenu