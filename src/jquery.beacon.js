(function($) {

  //Private internal function to access api (this is not available outside of our closure)
  function lighthouseService(beacon, base, callback) {
    var url = "http://" + beacon.settings.account + ".lighthouseapp.com/" + base + "&callback=?",
        query = {
          _token: beacon.settings.token
        };

    $.getJSON( url, query, function( data ) {
      callback.apply(this, $.makeArray( data ));
    });
  }

  //The Plugin itself
  $.beacon = function( options ) {
    return {
      //Function to set up account specific settings
      settings : $.extend( {}, {
         token: "bd66c626124a4eb231cd4f44e879414581f61d82"
      }, options),

      //==========================================================
      //  Projects
      //==========================================================

      listProjects : function(f) {
        lighthouseService(this, "projects.json", f);
      },

      getProject : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + ".json", f);
      },

      getNewProject : function(f) {
        lighthouseService(this, "projects/new.json", f);
      },

      //==========================================================
      //  Tickets
      //==========================================================

      listTickets : function( q, f ) {
        var q_encoded = encodeURIComponent( q ),
            url = "projects/" + this.settings.projectID + "/tickets.json?q=" + q_encoded;
        lighthouseService(this, url, f);
      },

      getTicket : function( ticket_number, f ) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/tickets/" + ticket_number + ".json", f);
      },

      getNewTicket : function( f ) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/tickets/new.json", f);
      },

      //==========================================================
      //  Messages
      //==========================================================

      listMessages : function( f ) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/messages.json", f);
      },

      getMessage : function( message_id, f ) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/messages/" + message_id + ".json", f);
      },

      getNewMessage : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/messages/new.json", f);
      },

      //==========================================================
      //  Milestones
      //==========================================================

      listMilestones : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/milestones.json", f);
      },

      getMilestone : function( milestone_id, f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/milestones/" + milestone_id + ".json", f);
      },

      getNewMilestone : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/milestones/new.json", f);
      },

      //==========================================================
      //  Ticket Bins
      //==========================================================

      listBins : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/bins.json", f);
      },

      getBin : function( bin_id, f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/bins/" + bin_id + ".json", f);
      },

      getNewBin : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/bins/new.json", f);
      },

      //==========================================================
      //  Users and Memberships
      //==========================================================

      getUser : function(user_id, f) {
        lighthouseService(this, "users/" + user_id + ".json", f);
      },

      getMemberships : function(user_id, f) {
        lighthouseService(this, "users/" + user_id + "/memberships.json", f);
      },

      getProjectMemberships : function( f) {
        lighthouseService(this, "projects/" + this.settings.projectID + "/memberships.json", f);
      },

      getToken : function(token_id, f) {
        lighthouseService(this, "tokens/" + token_id + ".json", f);
      }
    };
  };

})(jQuery);
