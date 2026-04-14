'use client';

import { Tenant } from "@/types/tenant";
import Button from "../UI/Button"
import Input from "../UI/Input"
import Modal from "../UI/Modal"

type FormType = {
  name: string;
  email: string;
  phone: string;
  rentAmount: string;
  dueDate: string;
};

interface AddModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editing: Tenant | null;
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  formLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AddModal = ({ showModal, setShowModal, editing, form, setForm, formLoading, handleSubmit }: AddModalProps) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={editing ? "Edit Tenant" : "Add New Tenant"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="john@example.com"
          required
        />
        <Input
          label="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 9876543210"
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
          }}
          maxLength={10}
          required
        />
        <Input
          label="Rent Amount (₹)"
          type="number"
          value={form.rentAmount}
          onChange={(e) =>
            setForm({ ...form, rentAmount: e.target.value })
          }
          placeholder="15000"
          required
        />
        <Input
          label="Due Date"
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" loading={formLoading}>
            {editing ? "Update Tenant" : "Add Tenant"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddModal