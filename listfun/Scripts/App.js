'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to 
    // use the SharePoint object model
    $(document).ready(function () {
        getUserName();
        $('#okay').click(retrieveListItems);
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}

// var siteUrl = '/sites/MySiteCollection';
console.log("SP List Manipulation....Things are happppening!")

var collListItem;

function retrieveListItems(e) {
            console.log("START: RetrieveListItem()")

            console.log("RetrieveListItem(): Getting Curent Context & List Content")
            var clientContext = new SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle('Announcements');

            console.log("RetrieveListItem(): Curent Context & List Content Retreived")
            console.log("RetrieveListItem(): CAML Query Formed")
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                '<Value Type=\'Number\'>1</Value></Geq></Where></Query><RowLimit>10</RowLimit></View>');

            collListItem = oList.getItems(camlQuery);
            console.log("RetrieveListItem(): CAML Query Formed")
            clientContext.load(collListItem);
            console.log("RetrieveListItem(): Query Context loaded")
            clientContext.executeQueryAsync(RLIonQuerySucceeded, RLIonQueryFailed);
                // Function.createDelegate(this, this.onQuerySucceeded),
                // Function.createDelegate(this, this.onQueryFailed));

            console.log("END: RetrieveListItem()")
        };

function RLIonQuerySucceeded(sender, args) {
    console.log("START: onQuerySucceeded()")

    console.log("onQuerySucceeded(): load list")
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();
    console.log("onQuerySucceeded(): list loaded")

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo += '\nID: ' + oListItem.get_id() +
            '\nTitle: ' + oListItem.get_item('Title') +
            '\nBody: ' + oListItem.get_item('Body');

    }
    console.log("onQuerySucceeded(): listitem built out")
    console.log('onQuerySucceeded(): ' + listItemInfo.toString())

    alert(listItemInfo.toString());

    console.log("END: onQuerySucceeded()")
}

function RLIonQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function createListItem() {
    console.log("START: createListItem()")

    console.log("createListItem(): Get Site and List context")
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Announcements');

    console.log("createListItem(): Create List Object")
    var itemCreateInfo = new SP.ListItemCreationInformation();

    console.log("createListItem(): Create List item")
    this.oListItem = oList.addItem(itemCreateInfo);

    console.log("createListItem(): Set Values in List item")
    oListItem.set_item('Title', 'My New Item!');
    oListItem.set_item('Body', 'Hello World!');

    console.log("createListItem(): Update List Item")
    oListItem.update();

    console.log("createListItem(): Load and Execute")
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(Function.createDelegate(this, this.CLIonQuerySucceeded), Function.createDelegate(this, this.CLIonQueryFailed));

    console.log("END: createListItem()")
}

function CLIonQuerySucceeded() {
    console.log("START: CLIonQuerySucceeded()")
    alert('Item created: ' + oListItem.get_id());
    console.log("END: CLIonQuerySucceeded()")
}

function CLIonQueryFailed(sender, args) {
    console.log("START: CLIonQueryFailed()")
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    console.log("END: CLIonQueryFailed()")
}

function deleteListItem() {
    console.log("START: deleteListItem()")

    console.log("deleteListItem(): geting site and list contex")
    var clientContext = new SP.ClientContext.get_current();
    var oWebsite = clientContext.get_web(); // this isnt correct, we need to get the list here  not the web 
    this.listTitle = 'My New Item!';

    console.log("deleteListItem(): Get List item by Title")
    this.oList = oWebsite.get_lists().getByTitle(listTitle);

    console.log("deleteListItem(): Delete Object")
    oList.deleteObject();  // this is attempting to delete the entire list not a list item another bug from MS - bastards!

    console.log("deleteListItem(): Execute")
    clientContext.executeQueryAsync(Function.createDelegate(this, this.DLIonQuerySucceeded), Function.createDelegate(this, this.DLIonQueryFailed));
    console.log("END: deleteListItem()")
}

function DLIonQuerySucceeded() {
    console.log("START: DLIonQuerySucceeded()")
    var result = listTitle + ' deleted.';
    alert(result);
    console.log("END: DLIonQuerySucceeded()")
}

function DLIonQueryFailed(sender, args) {
    console.log("START: DLIonQueryFailed()")
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    console.log("END: DLIonQueryFailed()")
}

function toggleCSS() {
    console.log("START: toggleCSS()")
 
    console.log("toggleCSS(): getting current site")
    var ctx = new SP.ClientContext.get_current();

    alert('Cant toggle CSS - YET!');

    console.log("END: toggleCSS()")
 }