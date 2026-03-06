import MainLayout from "../layouts/MainLayout";
import DocumentCard from "../components/DocumentCard";
import UploadModal from "../components/modals/uploadModal";
import UploadChoiceModal from "../components/modals/UploadChoiceModal";
import ConfirmDeclineModal from "../components/modals/ConfirmDeclineModal";
import useDashboard from "../hooks/useDashboard";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { Activity as ActivityIcon, CheckCircle2, UserPlus, FileEdit, Clock, ArrowRight, XCircle } from "lucide-react";

const Dashboard = () =>{
    const { user } = useAuth();
    const { 
        documents, 
        invitedDocuments, 
        activities, 
        loading, 
        error, 
        refresh,
        isUploadOpen,
        setUploadOpen,
        isChoiceOpen,
        setChoiceOpen,
        signMode,
        pendingCount,
        completedCount,
        handleChoiceSelect,
        acceptedInvites,
        actionLoading,
        handleAcceptInvite,
        handleDeclineInvite,
        isDeclineModalOpen,
        setDeclineModalOpen,
        declineDocumentInfo,
        confirmDeclineInvite
    } = useDashboard();

    const getActivityIcon = (action) => {
        switch (action) {
            case "signed": return { icon: CheckCircle2, iconClass: "text-green-600 bg-green-100" };
            case "invited": return { icon: UserPlus, iconClass: "text-blue-600 bg-blue-100" };
            case "created": return { icon: FileEdit, iconClass: "text-purple-600 bg-purple-100" };
            case "declined": return { icon: XCircle, iconClass: "text-red-600 bg-red-100" };
            default: return { icon: ActivityIcon, iconClass: "text-gray-600 bg-gray-100" };
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
            month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
        }).format(date);
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 auto-animate">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
                    </div>
                    <Button variant="primary" onClick={() => setChoiceOpen(true)} className="shadow-md shadow-red-200/50">
                        Upload New Document
                    </Button>
                </div>

                {/* Loading & Error */}
                {loading && (
                    <div className="p-12 text-center text-gray-500 font-medium bg-white rounded-2xl shadow-sm border border-gray-100">
                        Loading your dashboard...
                    </div>
                )}

                {error && (
                    <div className="p-12 text-center text-red-500 font-medium bg-red-50 rounded-2xl border border-red-100">
                        {error}
                    </div>
                )}

                {/* Dashboard Content */}
                {!loading && !error && (
                    <>
                        {/* Stats Overview */}
                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Documents</p>
                                <h3 className="text-4xl font-extrabold mt-2 text-gray-900">{documents.length}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-bl-full -z-0 opacity-50"></div>
                                <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wider relative z-10">Pending</p>
                                <h3 className="text-4xl font-extrabold mt-2 text-yellow-600 relative z-10">{pendingCount}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-0 opacity-50"></div>
                                <p className="text-sm font-semibold text-green-600 uppercase tracking-wider relative z-10">Completed</p>
                                <h3 className="text-4xl font-extrabold mt-2 text-green-600 relative z-10">{completedCount}</h3>
                            </div>
                        </div>

                        {/* Action Required: Invited Documents */}
                        {invitedDocuments && invitedDocuments.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-red-600">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    Action Required: Documents to Sign
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {invitedDocuments.map(signerRecord =>(
                                        <div key={signerRecord._id} className="bg-gradient-to-b from-red-50 to-white border border-red-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                                            <div>
                                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                                                    <FileEdit size={20} />
                                                </div>
                                                <h4 className="font-extrabold text-lg mb-1 text-gray-900 group-hover:text-red-700 transition-colors">{signerRecord.documentId?.originalFileName || "Unknown Document"}</h4>
                                                
                                                {signerRecord.documentId?.ownerId && (
                                                    <div className="mb-2 text-sm bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                                                        <span className="text-gray-500 font-medium">Invited by: </span>
                                                        <span className="font-bold text-gray-700">{signerRecord.documentId.ownerId.name}</span>
                                                        <p className="text-gray-400 text-[11px] mt-0.5">{signerRecord.documentId.ownerId.email}</p>
                                                    </div>
                                                )}

                                                <p className="text-sm text-gray-500 mb-6 font-medium">You have been invited to review and sign this document.</p>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2 w-full mt-auto">
                                                {acceptedInvites[signerRecord.token] || (user && signerRecord.documentId?.ownerId?._id === user._id) ? (
                                                    <a href={`/sign/${signerRecord.token}`} className="flex items-center justify-between w-full px-5 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 transition-all">
                                                        <span>Sign Now</span>
                                                        <ArrowRight size={18} />
                                                    </a>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => handleDeclineInvite(signerRecord.token, signerRecord.documentId?.originalFileName)}
                                                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors focus:outline-none"
                                                        >
                                                            Decline
                                                        </button>
                                                        <button 
                                                            onClick={() => handleAcceptInvite(signerRecord.token)}
                                                            className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors focus:outline-none"
                                                        >
                                                            Accept
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid lg:grid-cols-3 gap-8">
                            
                            {/* Main Grid: Uploaded Documents */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-xl font-bold text-gray-900">Recent Documents</h3>
                                    <a href="/documents" className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">View All <ArrowRight size={14} /></a>
                                </div>
                                {documents.length === 0 ? (
                                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileEdit className="text-gray-400" size={24} />
                                        </div>
                                        <p className="text-gray-500 font-medium">You haven't uploaded any documents yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {documents.slice(0, 4).map(doc =>(
                                            <DocumentCard 
                                                key={doc._id} 
                                                title={doc.originalFileName} 
                                                status={doc.status} 
                                                fileUrl={doc.currentFileUrl}
                                                totalSigners={doc.totalSigners}
                                                completedSigners={doc.completedSigners}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar: Recent Activity */}
                            <div className="lg:col-span-1">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                                    <a href="/activity" className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">View All <ArrowRight size={14} /></a>
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                                    {activities.length === 0 ? (
                                        <div className="text-center py-8">
                                            <ActivityIcon className="mx-auto text-gray-300 mb-2" size={32} />
                                            <p className="text-sm text-gray-500 font-medium">No recent activity.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {activities.slice(0, 5).map((activity) => {
                                                const { icon: Icon, iconClass } = getActivityIcon(activity.action);
                                                return (
                                                    <div key={activity._id} className="relative pl-6">
                                                        {/* Line connecting icons */}
                                                        <div className="absolute top-6 bottom-[-24px] left-[11px] w-px bg-gray-100 last:hidden"></div>
                                                        {/* Icon */}
                                                        <div className={`absolute -left-1.5 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 ${iconClass}`}>
                                                            <Icon size={10} className="stroke-[3]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-800 leading-snug mb-1">
                                                                {activity.details}
                                                            </p>
                                                            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                                                                <Clock size={10} />
                                                                {formatTime(activity.createdAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </>
                )}
            </div>

            {isChoiceOpen && (
                <UploadChoiceModal
                    onSelect={handleChoiceSelect}
                    onClose={() => setChoiceOpen(false)}
                />
            )}
            
            <ConfirmDeclineModal 
                isOpen={isDeclineModalOpen}
                onClose={() => setDeclineModalOpen(false)}
                onConfirm={confirmDeclineInvite}
                itemName={declineDocumentInfo?.name}
            />

            <UploadModal 
                isOpen={isUploadOpen}
                signMode={signMode}
                onClose={() => setUploadOpen(false)}
                onSuccess={refresh}
            />
        </MainLayout>
    );
};
export default Dashboard;