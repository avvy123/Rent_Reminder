'use client';

import React from "react";
import Modal from "../UI/Modal";

type Props = {
    deleteModal: boolean;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
    loading?: boolean;
    title?: string;
    description?: string;
};

const DeleteModal = ({
    deleteModal,
    setDeleteModal,
    handleDelete,
    loading = false,
    title = "Delete Tenant",
    description = "Are you sure you want to delete this tenant? This action cannot be undone.",
}: Props) => {

    return (
        <Modal
            isOpen={deleteModal}
            onClose={() => setDeleteModal(false)}
            title="Delete Tenant"
        >
            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
                {description}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={() => setDeleteModal(false)}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>

            </div>
        </Modal>
    );
};

export default DeleteModal;