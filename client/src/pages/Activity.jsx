import React from "react";
import MainLayout from "../layouts/MainLayout";
import { CheckCircle2, FileEdit, UserPlus, Clock, ArrowRight, Activity as ActivityIcon } from "lucide-react";
import useDocuments from "../hooks/useDocuments";

const Activity = () => {
    const { activities, loading, error } = useDocuments();

    const getActivityIcon = (action) => {
        switch (action) {
            case "signed": return { icon: CheckCircle2, iconClass: "text-green-600 bg-green-100" };
            case "invited": return { icon: UserPlus, iconClass: "text-blue-600 bg-blue-100" };
            case "created": return { icon: FileEdit, iconClass: "text-purple-600 bg-purple-100" };
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                
                {/* Header Section */}
                <div className="mb-8 border-b border-gray-100 pb-6 auto-animate">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Activity History</h1>
                    <p className="text-sm font-medium text-gray-500 mt-1">Keep track of all actions on your documents.</p>
                </div>

                {/* Timeline */}
                {loading ? (
                    <div className="text-gray-500 p-8 text-center font-medium">Loading history...</div>
                ) : error ? (
                    <div className="text-red-500 p-8 text-center font-medium">{error}</div>
                ) : activities.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <ActivityIcon className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No activities found</h3>
                        <p className="text-sm text-gray-500">Your recent actions will appear here</p>
                    </div>
                ) : (
                    <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 space-y-8">
                        {activities.map((activity) => {
                            const { icon: Icon, iconClass } = getActivityIcon(activity.action);
                            return (
                                <div key={activity._id} className="relative pl-8 md:pl-10 group">
                                    {/* Timeline Indicator */}
                                    <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${iconClass}`}>
                                        <Icon size={14} className="stroke-[2.5]" />
                                    </div>
                                    
                                    {/* Timeline Content */}
                                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-100 transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <p className="text-sm font-bold text-gray-900">
                                                {activity.details}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 shrink-0 bg-gray-50 px-2.5 py-1 rounded-full w-fit">
                                                <Clock size={12} />
                                                {formatTime(activity.createdAt)}
                                            </div>
                                        </div>
                                        
                                        {activity.documentId && (
                                            <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100/50 flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-400">
                                                        <FileEdit size={16} />
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-700">{activity.documentId.originalFileName}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Activity;
