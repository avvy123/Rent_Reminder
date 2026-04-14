'use client';

import { Calendar, Edit3, Mail, Phone, Sparkles, Trash2 } from "lucide-react"
import Button from "../UI/Button"
import { Tenant } from "@/types/tenant";

type TenantListProps = {
  filtered: Tenant[];
  openEdit: (tenant: Tenant) => void;
  handleDelete: (id: number) => void;
  handleReminder: (tenant: Tenant) => Promise<void>;
};

const TenantCard = ({filtered, openEdit, handleDelete, handleReminder} : TenantListProps) => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tenant) => (
            <div
              key={tenant.id}
              className="glass-card rounded-2xl p-5 flex flex-col"
            >
              {/* Top: Avatar + Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                    {tenant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {tenant.name}
                    </h4>
                    <p className="text-xs text-gray-500">Tenant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(tenant)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary-500 cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="p-2 rounded-lg hover:bg-rose-50 transition-colors text-gray-400 hover:text-rose-500 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400 shrink-0" />
                  <span>
                    Due:{" "}
                    {new Date(tenant.dueDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Bottom: Rent + AI button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Monthly Rent</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{tenant.rentAmount.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Sparkles size={14} />}
                  onClick={() => handleReminder(tenant)}
                >
                  Remind
                </Button>
              </div>
            </div>
          ))}
        </div>
    )
}

export default TenantCard