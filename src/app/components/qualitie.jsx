import React from "react";

const Qualities = ({qualities}) => {

        return qualities.map((item) => (
            <span key={item._id}
                  className={`badge bg-${item.color} m-2`}
            >
                {item.name}
            </span>
        ))
}

export default Qualities