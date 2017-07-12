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
console.log("Things are happppening")


var siteUrl = '/sites/espodev/listfun';
    // https://higherwiretechnologies-6553ca70b9b634.sharepoint.com/sites/dev/listfun

// $('#okay').click(retrieveListItems)

var collListItem;

function retrieveListItems(e) {
        console.log("START: RetrieveListItem()")

   //  e.preventDefault()
            //var clientContext = new SP.currentContext();
            //var ctx = new SP.ClientContext.get_current();

        console.log("RetrieveListItem(): Getting Curent Context & List Content")
            var clientContext = new SP.ClientContext(siteUrl);
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
            clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
                // Function.createDelegate(this, this.onQuerySucceeded),
                // Function.createDelegate(this, this.onQueryFailed));

            console.log("END: RetrieveListItem()")
        };

function onQuerySucceeded(sender, args) {
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

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
