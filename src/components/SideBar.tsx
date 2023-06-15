import React from "react";

function SideBar() {
    return (
        <div className="flex-col flex gap-4 w-fit p-2.5 bg-gray-800 min-w-[240px]">
            <div className="bg-gray-600 rounded-lg p-2.5">
                <div className="font-semibold">#cybersecurity #baking</div>
                <div className="text-sm text-gray-300">3 members</div>
            </div>
            <div className="bg-gray-600 rounded-lg p-2.5">
                <div className="font-semibold">#tennis #gaming</div>
                <div className="text-sm text-gray-300">5 members</div>
            </div>
        </div>
    );
}

export default SideBar;
