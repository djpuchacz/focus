describe("Get Method Suit", () =>{

  const baseURI = "https://api.stlouisfed.org/fred/releases";
  const currentDate = new Date().toISOString().slice(0,10);
  const queryParam = {file_type: "json", api_key: "7697b392caf737475db8cffe56e2436a"};
  
  it("Check if GET req catch today news", () =>{
    cy.request({
      method: "GET",
      url: baseURI,
      qs: queryParam
    })
    .then((response) =>{
      expect(response.status).to.eq(200); 
      expect(response.body.releases[0]).have.property("realtime_start", currentDate);
    })           
  })  

  it("Check if data has asc sorted", () =>{
    cy.request({
     method: "GET",
     url: baseURI,
     qs: queryParam
    })
    .then((response) =>{
      expect(response.status).to.eq(200);
      expect(response.body.sort_order).to.eq("asc");
    })
  })    

  it("Check if application/json contentType is correct", () =>{
    cy.request({
     method: "GET",
     url: baseURI,
     qs: queryParam
    }).as("alias")
    cy.get('@alias').its('headers').its('content-type')
    .should('include', "application/json; charset=UTF-8")
  })

  it("Check if text/xml contentType is correct", () =>{
    cy.request({
      method: "GET",
      url: baseURI,
      qs: {api_key: "7697b392caf737475db8cffe56e2436a"}
    }).as("alias")
    cy.get('@alias').its('headers').its('content-type')
      .should('include', "text/xml")
  })

}) 

