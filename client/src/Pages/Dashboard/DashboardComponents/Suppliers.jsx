
const Suppliers = () => {
  return (
    <div className="suppliers p-5">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr>
            <th className="rounded p-4">Supplier Name</th>
            <th className="rounded p-4">Contact</th>
            <th className="rounded p-4">Address</th>
          </tr>
        </thead>
        <tbody >
          <tr className="rounded bg-gray-100">
            <td className="p-4">Kahad I.T Gadgets</td>
            <td className="p-4">+233 599 164 988</td>
            <td className="p-4">Hausa Zongo</td>
          </tr>
          <tr className="rounded bg-gray-100">
            <td className="p-4">Global Funiture</td>
            <td className="p-4">+233 535 434 474</td>
            <td className="p-4">Sagnerigy</td>
          </tr>
          <tr className="rounded bg-gray-100">
            <td className="p-4">Smart Home</td>
            <td className="p-4">+233 244 803 942</td>
            <td className="p-4">Changli</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Suppliers