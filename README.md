[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16765189)
Here are the files at left: 
1. **script.js** is where you paste comments, then build and test code.
1. **index.html** is the web page that chooses the script file to run. **Don't edit it.**
1. **devcontainer.json** loads the MS Preview app for CodeSpaces.

# Instructions: 2 Functions #
You are **creating a shipping calculator** for an online store.
## Function 1 (line 70): Calculate Dimensional Weights for each cart item. ##
**Resources:** Here is a [sheet with three Guinea Pig supply items](https://docs.google.com/spreadsheets/d/126gkcIq-qV_TUj57O4AE25ivtdfwt4FmEpMTfl7e44o/edit?gid=0#gid=0).  Get info on each item from [PetCo (price, weight, dimensions)](https://www.petco.com/shop/en/petcostore/). 
**Requirements**:
1. Dimensions could be litres, length width height, or something else.  **You need the sheet to convert to cubic inches**.
1. Weight could be in ounces or pounds.  **You need the sheet to convert to pounds.**
1. Once you know cubic inches, get the "dimensional weight" for each by dividing the value by 139.  [Read about that here](https://redstagfulfillment.com/dimensional-weight-calculator/). Your shipping is based on whichever is greater - the dimensional weight or the actual weight in pounds.
  
## Function 2 (line 84): Calculate Total Shipping by calculating the shipping cost of each dimWeight.##
**Resources:** Here are the [USPS shipping rates including Advantage](https://www.pitneybowes.com/us/blog/usps-shipping-rates-increase-2023.html).  We will be in Zone 1. 
**Requirements**: Because we assume Zone 1 and Advantage shipping, there are no user inputs.  Just pull values from the dimWeights array to calculate total shipping.
1. Loop over each item in dimWeights. 
1. Multiply it by $7.60.
1. Add that to totalShipping.
1. Return totalShipping after the loop is done.
      
# Testing: Cart Order #
Use values from the spreadsheet. 
1. 1 Cage
1. 5 Food
1. 3 Bedding
1. Checkout
1. Enter DimWeight Dimensions (popups)
1. Record Grand Total and submit for Final Exam.  
