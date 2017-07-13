<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
       SharePoint List Manipulation using JSOM
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    
    <div>     
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing... 
        </p>
    </div>
    <h2>the above code appears in the document.ready within initializepage()</h2>
    <br />
    <br />
    <h2>Start the debugger console to see log messages</h2>
    Code sourced from <a href="https://msdn.microsoft.com/en-us/library/office/hh185011(v=office.14).aspx">How to Create, Update and Delte List Items using JavaScript</a>
    <b>There are bugs in Microsoft's sample code, but corrected in this solution</b>
    
    <br />
    <br />
    <br />
    <input id="Retrieve List Items" type="button" value="Retrieve List Items" onclick="retrieveListItems();" /> 
    <h2>retrieve 10 items from list 'Announcement' and present them in an alert</h2>
    <br />
    <br />
    <input id="Create List Item" type="button" value="Create List Item" onclick="createListItem();" /> 
    <h2>Create a new item called 'My New Item!' in list 'Announcement' </h2>
    <br />
    <br />
    <input id="Delete List Item" type="button" value="Delete List Item" onclick="deleteListItem();" /> 
    <h2>Delete the item titled 'My New Item!' from list 'Announcement'.  Click Retrieve List Items to check if you have one</h2>
    <b>Code fails at the moment, but that's ok too for learning</b>
  
    <br />
    <br />
    <input id="ToggleCSS" type="button" value="Toggle SuiteBar and Page Title" onclick="toggleCSS();" /> 
    <h2>Set Display:none on #SuiteBar, #titleRow & #something else</h2>
    <b>not working yet</b>
</asp:Content>
