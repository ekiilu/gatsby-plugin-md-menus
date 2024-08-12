// Function to find the order index for sorting
function getOrderIndex(url, forcedNavOrder, level) {

  return forcedNavOrder.findIndex(orderUrl => {

    if (level >= 3) {
      const result = orderUrl.split('/').slice(0, level).join('/');
      return url === result;
    }
    return url === orderUrl;
  });
}

export default getOrderIndex;