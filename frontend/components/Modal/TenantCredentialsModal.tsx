'use client';

import { Copy } from "lucide-react";
import Modal from "../UI/Modal"

type CredentailsData = {
    email: string;
    name: string;
    tempPassword: string;
}

interface TenantCredentialsModalProps {
    credentialModal: boolean;
    setCredentialModal: React.Dispatch<React.SetStateAction<boolean>>;
    tenantCredentials: CredentailsData;
}

const TenantCredentialsModal = ({ credentialModal, setCredentialModal, tenantCredentials }: TenantCredentialsModalProps) => {
    const handleCopy = () => {
        const text = `Email: ${tenantCredentials.email}\nPassword: ${tenantCredentials.tempPassword}`;
        navigator.clipboard.writeText(text);
    };
    return (
        <Modal
            isOpen={credentialModal}
            onClose={() => setCredentialModal(false)}
            title="Tenant Credentials"
        >
            <p className="text-sm text-gray-500 mb-4">
                Share these login details with the tenant.
            </p>

            {/* Card */}
            <div className="bg-gray-50 border rounded-xl p-4 space-y-3">

                <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{tenantCredentials.name}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{tenantCredentials.email}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Password</p>
                    <p className="font-medium text-red-600">
                        {tenantCredentials.tempPassword}
                    </p>
                </div>

            </div>

            {/* Warning */}
            <p className="text-xs text-red-500 mt-4">
                ⚠️ Please save this password. It will not be shown again.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">

                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    <Copy />
                </button>
            </div>
        </Modal>
    )
}

export default TenantCredentialsModal