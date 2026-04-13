'use client'

import { getAllUsers } from "@/services/adminService";
import { useQuery } from "@tanstack/react-query";

export default function PropertiesPage() {

  const {
      data: properties = [],
    } = useQuery({
      queryKey: ["allUsers"],
      queryFn: getAllUsers,
      staleTime: 1000 * 60 * 5,
    });

  const approvedProperties = properties.filter(property => property.status === "Approved");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        {approvedProperties.map((property) => (
          <div
            key={property.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p>Propert Type: {property.bhk}</p>
              <p>Number of Properties: {property.propertyCount}</p>
              <p className="text-sm text-gray-500">
                Owner: {property.name}
              </p>
            </div>

            <button className="text-red-500">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}