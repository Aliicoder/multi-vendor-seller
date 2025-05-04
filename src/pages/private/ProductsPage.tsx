import { useState } from "react";
import { TbFilter } from "react-icons/tb";
import useProductsPagination from "@/hooks/useProductsPagination";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/types/types";
import Pagination from "@/components/shared/Pagination";
import DeleteProductPortal from "@/components/portals/DeleteProductPortal";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import Absolute from "@/components/styled/Absolute";
import { CiSearch } from "react-icons/ci";
import useSetTimeout from "@/hooks/useSetTimeout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "@/components/buttons/CustomButton";
import { cn } from "@/lib/utils";
import { currencyFormatter } from "@/lib/helpers/currencyFormatter";

function ProductsPage() {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const { userId } = useSelector(selectCurrentUser);
  const [name, setSearchName] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [sort, setSort] = useState<any>([]);
  const { products, counter, handleLeft, handleRight } = useProductsPagination({
    name,
    sellerId: userId,
    perPage,
    sort,
  });
  const navigate = useNavigate();
  const [productToBeDeleted, setProductToBeDeleted] = useState<IProduct>();
  const [openFilter, setOpenFilter] = useState(false);
  const { timeouter } = useSetTimeout();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    timeouter(() => {
      setSearchName(value);
    }, 2000);
  };
  const handleSortChange = (name: string, value: string) => {
    setSort((prevSort: string[]) => {
      let updatedSort = prevSort.filter((key) => !key.includes(name));
      if (value !== "default") {
        updatedSort = [value, ...updatedSort];
      }
      return updatedSort;
    });
  };

  return (
    <>
      <DeleteProductPortal
        productToBeDeleted={productToBeDeleted}
        setProductToBeDeleted={setProductToBeDeleted}
      />

      <div className="flex flex-col p-6 grow relative">
        <div className="flex font-normal gap-5 items-center py-6 relative">
          <div
            className=" px-2 py-3 text-blue-500  flex items-center h-9 border text-sm 
          shadow-sm rounded-lg overflow-hidden bg-white border-neutral-200"
          >
            <div className="font-bold fs-20">
              <CiSearch className="m-1 cursor-pointer" />
            </div>
            <input
              onChange={handleSearchChange}
              placeholder="search "
              className={`pl-3  w-full font-sans  outline-none bg-inherit`}
              type="text"
            />
          </div>

          <CustomButton
            onClick={() => navigate("addProduct")}
            theme="white"
            className="h-9 text-sm ml-auto"
          >
            add product +
          </CustomButton>
        </div>

        <div className="flex font-normal fs-20 gap-3 items-center py-6">
          <Select onValueChange={(value) => handleSortChange("price", value)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="default price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-price">highest to lowest</SelectItem>
              <SelectItem value="price">lowest to highest</SelectItem>
              <SelectItem value="default">default price </SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleSortChange("createdAt", value)}
          >
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="default date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">highest to lowest</SelectItem>
              <SelectItem value="createdAt">lowest to highest</SelectItem>
              <SelectItem value="default">default date</SelectItem>
            </SelectContent>
          </Select>
          <CustomButton
            onClick={() => setOpenFilter(!openFilter)}
            className="flex h-9 text-sm gap-3 items-center ml-auto"
          >
            Filter
            <TbFilter />
          </CustomButton>
          <Absolute className="h-full w-[100svw] left-full top-0 z-[100]" />
        </div>

        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
          <table className="border-separate border-spacing-y-4 w-full">
            <thead>
              <tr>
                <th>_Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Sales</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                products.length > 0 &&
                products.map((product: IProduct) => (
                  <>
                    <tr
                      key={product._id}
                      className="border border-b text-center"
                    >
                      <td className="p-5">
                        <h1 className="m-auto text-center w-[10ch] truncate">
                          {product._id}
                        </h1>
                      </td>
                      <td>
                        <div className="relative">
                          {product.media &&
                            product.media.map((image, i) => {
                              return (
                                <div
                                  style={{ marginLeft: i * 20 }}
                                  className={cn(
                                    "rounded-full overflow-hidden border border-blue-500 w-12 h-12",
                                    i > 0 && "absolute left-0 top-0"
                                  )}
                                >
                                  {image.url ? (
                                    <img
                                      className="h-full w-full object-cover"
                                      src={image.url}
                                      alt=""
                                    />
                                  ) : (
                                    <span className="text-gray-400">
                                      No Image
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </td>
                      <td>
                        {" "}
                        <h1 className="m-auto text-center w-[10ch] truncate">
                          {product.name}
                        </h1>
                      </td>
                      <td>{product.category}</td>
                      <td>{currencyFormatter("INR", product.price)}</td>
                      <td>{product?.discount}%</td>
                      <td>{product.stock}</td>
                      <td>{product.sales}</td>
                      <td>
                        {product.rating == 0
                          ? "no reviews yet"
                          : product.rating}
                      </td>
                      <td>
                        <button
                          className="bg-blue-500 rounded text-white px-4 py-2"
                          onClick={() =>
                            setExpandedRowId(
                              expandedRowId === product._id ? null : product._id
                            )
                          }
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                    {expandedRowId === product._id && (
                      <tr className="bg-slate-50">
                        <td colSpan={10} className="p-4 text-center">
                          <button
                            onClick={() => {
                              navigate(`edit/${product._id}`, {
                                state: { product },
                              });
                            }}
                            className="bg-green-500 rounded text-white mr-2 px-3 py-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setProductToBeDeleted(product)}
                            className="bg-red-500 rounded text-white mr-2 px-3 py-2"
                          >
                            Delete
                          </button>
                          <button className="bg-yellow-500 rounded text-white px-3 py-2">
                            View Details
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td className="bg-slate-50 p-5 text-center" colSpan={10}>
                    <h1>empty list</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-evenly p-6 items-center">
          <div />
          <Pagination
            className="m-8"
            counter={counter}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
          />
          <div className="flex gap-3 ml-auto">
            <select
              onChange={(e) => setPerPage(+e.target.value)}
              className="bg-transparent fs-16"
            >
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
            <h1 className="text-sm">Per page</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
