import React from 'react';

export const Labels = (labels) => {
  return labels.map((label,index) => <span className="label label-warning" key={index}>{label}</span>)
}

export default Labels
