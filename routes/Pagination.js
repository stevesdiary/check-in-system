findAll: async (req, res, next) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const record_per_page = parseInt(req.query.record_per_page) || 50;
    const count = await Description.count();
    let descriptions  = await Description.findAll();
    let per_page;
    if (count < record_per_page){
      per_page = count
    }
    if (count > (record_per_page - 1)){
      per_page = record_per_page
    }
    descriptions = descriptions.slice((record_per_page * page) - record_per_page, record_per_page * page)
    
    const from = (page - 1) * per_page;
    let to = page * per_page
    if(to > count) {
      to = count;
    }
    const total_pages = Math.ceil(count / per_page);
    return res.status(200).json({ 
      Message: 'Records found', 
      page: page,
      per_page: per_page,
      total_records: count,
      total_pages: total_pages,
      showing_from: from + 1,
      to: to, 
      Descriptions: descriptions 
    })
  }
  catch (error) {
    next(error)
  }
}