class ActorSheetwfrp3 extends ActorSheet {

  get actorType() 
  {
    return this.actor.data.type;
  }

  static get defaultOptions() 
  {
    const options = super.defaultOptions;
    options.tabs = [{navSelector: ".tabs", contentSelector: ".content", initial: "main"}]
    options.width = 600;
	  return options;
  }

  async _render(force = false, options = {}) 
  {
    this._saveScrollPos(); // Save scroll positions
    await super._render(force, options);
    this._setScrollPos();  // Set scroll positions

    // Add Tooltips
    $(this._element).find(".close").attr("title", game.i18n.localize("SHEET.Close"));
    $(this._element).find(".configure-sheet").attr("title", game.i18n.localize("SHEET.Configure"));
    $(this._element).find(".configure-token").attr("title", game.i18n.localize("SHEET.Token"));
    $(this._element).find(".import").attr("title", game.i18n.localize("SHEET.Import"));
  }

  _saveScrollPos()
  {
    if (this.form !== null)
    {
      const html = $(this.form).parent();
      this.scrollPos = [];
      let lists = $(html.find(".save-scroll"));
      for (let list of lists)
      {
        this.scrollPos.push($(list).scrollTop());
      }
    }
  }

  _setScrollPos()
  {
    if (this.scrollPos)
    {
      const html = $(this.form).parent();
      let lists = $(html.find(".save-scroll"));
      for (let i = 0; i < lists.length; i++)
      {
        $(lists[i]).scrollTop(this.scrollPos[i]);
      }
    }
  }

  getData()
  {
    const sheetData = super.getData();
    mergeObject(sheetData.actor, this.actor.prepare())
    sheetData.isGM = game.user.isGM;
    return sheetData;
  }
  
  activateListeners(html)
  {
    super.activateListeners(html);

    html.find('.attribute-toggle').click(async ev =>
    {
      let attribute = $(ev.currentTarget).attr("toggle-type");
      let attributes = duplicate(this.actor.data.data.attributes);
      let currentChar = attributes[attribute];
      if(currentChar.luck) 
      {
        currentChar.luck = false;
      } else 
      {
        currentChar.luck = true;
      }
      await this.actor.update({"data.attributes": attributes });
    });

    html.find('.stance-toggle').click(async ev =>
    {
      let newStance = $(ev.currentTarget).attr("toggle-type");
      let stance = duplicate(this.actor.data.data.state.stance);
      stance.NA = false;
      for(let i = 1; i <= 6; i++) 
      { 
        stance["R" + i] = false;
        stance["C" + i] = false;
      }      
      stance[newStance] = true;
      await this.actor.update({"data.state.stance": stance});
    });

    html.find('.attr-edit').focusout(async event => {
      event.preventDefault();
      let characteristics = this.actor.data.data.attributes;
      let ch = $(event.currentTarget).attr("data-attribute");
      let newValue  = Number(event.target.value);
      let updateObj = duplicate(this.actor.data.data.attributes);
      if (!(newValue == characteristics[ch].value))
      {
        updateObj[ch].value = newValue;
        await this.actor.update({"data.attributes" : updateObj});
      }
    });

    html.find('.skill-adv input').focusout(async event => {
      event.preventDefault();
      let skills = this.actor.data.data.advancedSkills;
      let ch = $(event.currentTarget).attr("data-skill");
      let newValue  = Number(event.target.value);
      let updateObj = duplicate(this.actor.data.data.advancedSkills); 
      if (!(newValue == skills[ch].value))
      {
        updateObj[ch].value = newValue;
        await this.actor.update({"data.advancedSkills" : updateObj});
      }
    });

    html.find('.skill-spec input').focusout(async event => {
      event.preventDefault();
      let skills = this.actor.data.data.advancedSkills;
      let ch = $(event.currentTarget).attr("data-skill");
      let newValue = event.target.value;
      let updateObj = duplicate(this.actor.data.data.advancedSkills);
      if (!(newValue == skills[ch].specializations))
      {
        updateObj[ch].specializations = newValue;
        await this.actor.update({"data.advancedSkills" : updateObj});
      }
    });

    html.find('.basic-skill-adv input').focusout(async event => {
      event.preventDefault();
      let skills = this.actor.data.data.skills;
      let ch = $(event.currentTarget).attr("data-skill");
      let newValue  = Number(event.target.value);
      let updateObj = duplicate(this.actor.data.data.skills); 
      if (!(newValue == skills[ch].value))
      {
        updateObj[ch].value = newValue;
        await this.actor.update({"data.skills" : updateObj});
      }
    });

    html.find('.basic-skill-spec input').focusout(async event => {
      event.preventDefault();
      let skills = this.actor.data.data.skills;
      let ch = $(event.currentTarget).attr("data-skill");
      let newValue = event.target.value;
      let updateObj = duplicate(this.actor.data.data.skills);
      if (!(newValue == skills[ch].specializations))
      {
        updateObj[ch].specializations = newValue;
        await this.actor.update({"data.skills" : updateObj});
      }
    });

    html.find('.readonly-toggle').mousedown(async ev => {
      let toggle = $(event.target).attr("toggle-type");
      if (event.button == 2)
      {
        let newFlags = duplicate(this.actor.data.flags);
        if(newFlags[toggle])
        { 
          newFlags[toggle] = false;
        } else
        {
          newFlags[toggle] = true;
        }
        this.actor.update({'flags' : newFlags})
      }
    });
  
    html.find('.metacurrency-value').mousedown(async ev =>  {
      let type = $(ev.currentTarget).attr("data-point-type");
      let newValue = ev.button == 0 ? this.actor.data.data.state[type].value + 1 : this.actor.data.data.state[type].value - 1 
      this.actor.update({[`data.state.${type}.value`] : newValue})
    });

    html.find('.item-dropdown').click(event => this._onItemSummary(event));

    // Item Properties TODO: add description
    html.find('.item-property-quality').click(event => this._expandProperty(event));

    // WEapon group TODO: add description
    html.find('.weapon-group').click(event => this._expandInfo(event));

    // Autoselect entire text 
    html.find("input[type=text]").focusin(() => $(this).select());

    // card test 
    html.find('.card-item-name').click(event => {
      event.preventDefault();
      let itemId = $(event.currentTarget).parents(".item").attr("data-item-id");
      let card = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      if (card)
      {
        this.actor.setupCard(duplicate(card));
      }
    });
    
    // Roll a disease and then right click decrement once rolled
    html.find('.disease-roll').mousedown(async ev =>  {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      const disease = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      let type = ev.target.attributes.class.value.split(" ")[0].trim(); // Incubation or duration

      // If left click - TODO: Enum
      if (ev.button == 0)
      { // Parse disease length and roll it
        try
        {
          let rollValue = new Roll(disease.data[type].value.split(" ")[0]).roll().total
          let timeUnit = disease.data[type].value.split(" ")[1];
          disease.data[type].roll = rollValue.toString() + " " + timeUnit;
        }
        catch
        {
          disease.data[type].roll = disease.data[type].value;
        }

        this.actor.updateEmbeddedEntity("OwnedItem", disease);
      }
      // If right click
      else if (ev.button == 2)
      {
        if(disease.data[type].roll) // If the disease has been rolled - decrement the value
        {
          let number = Number(disease.data[type].roll.split(" ")[0]) - 1;
          let timeUnit = disease.data[type].roll.split(" ")[1];
          disease.data[type].roll = `${number} ${timeUnit}`;
        }
        this.actor.updateEmbeddedEntity("OwnedItem", disease);
      }
    });

    // Create New Item
    html.find('.item-create').click(ev => this._onItemCreate(ev));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      const item = this.actor.items.find(i => i.data._id == itemId)
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      let li = $(ev.currentTarget).parents(".item"),
      itemId = li.attr("data-item-id");
      if(this.actor.getEmbeddedEntity("OwnedItem", itemId).name == "Boo")
      {
        AudioHelper.play({src : "systems/wfrp3/sounds/squeek.wav"}, false)
        return;
      }
      
      renderTemplate('systems/wfrp3/templates/chat/delete-item-dialog.html').then(html => {
        new Dialog({
        title: "Delete Confirmation",
        content: html,
        buttons: {
            Yes: {
              icon: '<i class="fa fa-check"></i>',
              label: "Yes",
              callback: dlg => {
                this.actor.deleteEmbeddedEntity("OwnedItem", itemId);
                li.slideUp(200, () => this.render(false));
              }
            },
            cancel: {
              icon: '<i class="fas fa-times"></i>',
              label: "Cancel"
            },
          },
          default: 'Yes'
        }).render(true)
      });
    });

    // Remove Inventory Item from Container - change container value to 0
    html.find('.item-remove').click(ev => {
      let li = $(ev.currentTarget).parents(".item"),
      itemId = li.attr("data-item-id");
      const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      item.data.container.value = "0";
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Toggle Count Enc for containers 
    html.find('.toggle-enc').click(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      item.data.countEnc.value = !item.data.countEnc.value;
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Switch an item's toggle, such as wearing armor, clothing, or equipping weapons
    html.find('.item-toggle').click(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      let equippedState;

      item.data.equipped.value = !item.data.equipped.value;
      equippedState = item.data.equipped.value      
    
      WFRP_Audio.PlayContextAudio({item : item, action : "equip", outcome : equippedState})    
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Toggle whether a container is worn
    html.find('.worn-container').click(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      item.data.equipped.value = !item.data.equipped.value;
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Increment or decrement an items quantity by 1 or 10 (if holding crtl)
    html.find('.quantity-click').mousedown(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId));
      switch (event.button)
      {
        case 0:
          if (event.ctrlKey) 
          {
            item.data.quantity.value += 10;
          }
          else
          {
            item.data.quantity.value++;
          }

          break;
        case 2:
          if (event.ctrlKey)
          {
            item.data.quantity.value -= 10;
          }
          else
          {
            item.data.quantity.value--;
          }

          if (item.data.quantity.value < 0)
          {
            item.data.quantity.value = 0;
          }
          break;
      }
      this.actor.updateEmbeddedEntity("OwnedItem", item);
    });

    // Clicking the 'Qty.' label in an inventory section - aggregates all items with the same name
    html.find(".aggregate").click(async ev => {
      let itemType = $(ev.currentTarget).attr("data-type");
      let items = duplicate(this.actor.data.items.filter(x => x.type == itemType))
      
      for (let i of items)
      {
        let duplicates = items.filter(x => x.name == i.name) // Find all the items with the same name
        if (duplicates.length > 1)
        {
          let newQty = duplicates.reduce((prev, current) => prev + current.data.quantity.value, 0) // Sum the quantity of all items with the same name
          i.data.quantity.value = newQty                                                           // Change the quantity to the sum 
        }
      }

      // Array that will hold the aggregated items (with *no duplicates*)
      let noDuplicates = []
      for (let i of items)
      {
        // Add item to noDuplicates if the array doesn't already contain the item
        if (!noDuplicates.find(x => x.name == i.name))
        {
          noDuplicates.push(i);
          await this.actor.updateEmbeddedEntity("OwnedItem", {"_id" : i._id, "data.quantity.value" : i.data.quantity.value})
        }
        else
          await this.actor.deleteEmbeddedEntity("OwnedItem", i._id);
      }
    });

    // Right click - duplicate option for trappings
    html.find(".inventory .item .item-name").mousedown(ev => {
      if (ev.button == 2)
      {
        new Dialog({
          title: game.i18n.localize("SHEET.DupTitle"),
          content: `<p>${game.i18n.localize("SHEET.DupPrompt")}</p>`,
          buttons: {
            yes: {
              label: "Yes",
              callback: (dlg) => {
                this.duplicateItem($(ev.currentTarget).parents(".item").attr("data-item-id"));
              }
            },
            cancel: {
              label: "Cancel",
              callback: dlg => {
                return
              }
            },
          },
          default: 'yes'
        }).render(true);
      }
    });

    // Post Item to chat
    html.find(".item-post").click(ev => {
      let itemId = $(ev.currentTarget).parents(".item").attr("data-item-id");
      const item = this.actor.items.find(i => i.data._id == itemId)
      item.postItem();
    })

    // Creature and NPC sheets - click on the 'name' label to generate a name
    html.find(".name-gen").click(ev => {
      let name = NameGenWfrp.generateName({species : this.actor.data.data.details.species.value, gender : this.actor.data.data.details.gender.value})
      this.actor.update({"name" : name});
    })

    // Item Dragging
    let handler = ev => this._onDragItemStart(ev);
    html.find('.item').each((i, li) => {
      li.setAttribute("draggable", true);
      li.addEventListener("dragstart", handler, false);
    });

    // ---- Listen for custom entity links -----
    html.on("click", ".chat-roll", ev => {
      WFRP_Utility.handleRollClick(ev)
    });

    html.on("click", ".symptom-tag", ev => {
      WFRP_Utility.handleSymptomClick(ev)
    });

    html.on("click", ".condition-chat", ev => {
      WFRP_Utility.handleConditionClick(ev)
    });

    html.on('mousedown', '.table-click', ev => {
      WFRP_Utility.handleTableClick(ev)
    });

    html.on('mousedown', '.pay-link', ev => {
      WFRP_Utility.handlePayClick(ev)
    });

    // Consolidate common currencies
    html.find('.dollar-icon').click(async event => {
      event.preventDefault();
      let money = duplicate(this.actor.data.items.filter(i => i.type == "money"));
      money = Marketwfrp3.consolidateMoney(money);
      await this.actor.updateEmbeddedEntity("OwnedItem", money);
    });
  }

  _onDragItemStart(event) {
    let itemId = event.currentTarget.getAttribute("data-item-id");
    const item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      event.dataTransfer.setData("text/plain", JSON.stringify({
      type: "Item",
      sheetTab : this.actor.data.flags["_sheetTab"],
      actorId: this.actor._id,
      data: item,
      root : event.currentTarget.getAttribute("root")
    }));
  }

  async _onDrop(event) // TODO: This function needs a heavy refactor because it's quite gross
  { 
    let dragData = event.dataTransfer.getData("text/plain");
    let dropID = $(event.target).parents(".item").attr("data-item-id"); // Only relevant if container drop

    // Inventory Tab - Containers
    if ($(event.target).parents(".item").attr("inventory-type") == "container")
    {
      let dragItem = JSON.parse(dragData)
      if (dragItem.data._id == dropID) // Prevent placing a container within itself (we all know the cataclysmic effects that can cause)
      {
        throw "error! Chaos attack!";
      }
      else if (dragItem.data.type == "container" && $(event.target).parents(".item").attr("last-container")) 
      {
          throw game.i18n.localize("SHEET.NestedWarning")
      }
      else if (dragItem.data.type == "container") 
      {
        // If container A has both container B and container C, prevent placing container B into container C without first removing B from A
        // This resolves a lot of headaches around container loops and issues of that natures
        if (JSON.parse(dragData).root == $(event.target).parents(".item").attr("root")) 
        {
          ui.notifications.error("Remove the container before changing its location");
          throw game.i18n.localize("SHEET.LocationWarning");
        }
      }
      dragItem.data.data.container.value = dropID; // Change container value of item to the id of the container it is in

      //  this will unequip/remove items like armor and weapons when moved into a container
      dragItem.data.data.equipped.value = false;
      await this.actor.updateEmbeddedEntity("OwnedItem", dragItem.data);
    }
    // Dropping an item from chat
    else if (JSON.parse(dragData).postedItem)
    {
      this.actor.createEmbeddedEntity("OwnedItem", JSON.parse(dragData).data);
    }    
    // From character creation - exp drag values
    else if (JSON.parse(dragData).exp)
    {
      let data = duplicate(this.actor.data.data);
      data.details.experience.total += JSON.parse(dragData).exp;
      await this.actor.update({"data" : data})
    }    
    else // If none of the above, just process whatever was dropped upstream
    {
      super._onDrop(event)
    }
  }

  _onItemSummary(event)
  {
    event.preventDefault();
    let li = $(event.currentTarget).parents(".item");
    let item = this.actor.items.find(i => i.data._id == li.attr("data-item-id"));
    // Call the item's expandData() function which gives us what to display
    let expandData = item.getExpandData({ secrets: this.actor.owner });
  
    // Toggle expansion for an item
    if (li.hasClass("expanded")) // If expansion already shown - remove
    {
      let summary = li.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    }
    else
    {
      // Add a div with the item summary belowe the item
      let div = "";
      div = $(`<div class="item-summary">${expandData.description.value}</div>`);
  
      let props = $(`<div class="item-properties"></div>`);
      expandData.properties.forEach(p => props.append(`<span class="tag">${p}</span>`));
      div.append(props);
      li.append(div.hide());
      div.slideDown(200);
  
      // Clickable tags
      // Post an Item Quality/Flaw
      div.on("click", ".item-property", ev =>
      {
        WFRP_Utility.postProperty(ev.target.text) 
      });

      // Respond to template button clicks
      div.on("mousedown", '.aoe-template', event =>
      {
        AOETemplate.fromString(event.target.text).drawPreview(event);
        this.minimize();
      });
    }
    li.toggleClass("expanded");
  }
  
  _expandProperty(event)
  {
    event.preventDefault();
  
    let li = $(event.currentTarget).parents(".item");
    let property = event.target.text; // Proprety clicked on
    let properties = WFRP_Utility.qualityList(); // Property names
    let propertyDescr = duplicate(wfrp3.qualityDescriptions); // Property descriptions
  
    property = property.replace(/,/g, '').trim(); // Remove commas/whitespace
  
    let propertyKey = "";
    if (property == "Special") // Special comes from user-entry in a Weapon's Special box
    {
      let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", li.attr("data-item-id")))
      // Add the special value to the object so that it can be looked up
      propertyDescr = Object.assign(propertyDescr,
      {
        "Special": item.data.special.value
      });
      item = this.actor.prepareWeaponCombat(item);
      propertyKey = "Special";
    }
    else // Otherwise, just lookup the key for the property and use that to lookup the description
    {
      propertyKey = WFRP_Utility.findKey(WFRP_Utility.parsePropertyName(property), properties)
    }
  
    let propertyDescription = "<b>" + property + "</b>" + ": " + propertyDescr[propertyKey];
    // Toggle expansion 
    if (li.hasClass("expanded"))
    {
      let summary = li.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    }
    else
    {
      let div = $(`<div class="item-summary">${propertyDescription}</div>`);
      li.append(div.hide());
      div.slideDown(200);
    }
    li.toggleClass("expanded");
  }
  
  _expandInfo(event)
  {
    event.preventDefault();
    let li = $(event.currentTarget).parents(".item");
    let classes = $(event.currentTarget);
    let expansionText = "";
    
    if (classes.hasClass("weapon-group"))
    {
      let weaponGroup = event.target.text;
      let weaponGroupKey = "";
      weaponGroupKey = WFRP_Utility.findKey(weaponGroup, wfrp3.weaponGroups);
      expansionText = wfrp3.weaponGroupDescriptions[weaponGroupKey];
    }  
    // Toggle expansion 
    if (li.hasClass("expanded"))
    {
      let summary = li.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    }
    else
    {
      let div = $(`<div class="item-summary">${expansionText}</div>`);
      li.append(div.hide());
      div.slideDown(200); 
    }
    li.toggleClass("expanded");
  }  
  
  _onItemCreate(event)
  {
    event.preventDefault();
    let header = event.currentTarget,
    data = duplicate(header.dataset);
    if (data.type == "trapping")
    {
      data = mergeObject(data,
      {
        "data.trappingType.value": event.currentTarget.attributes["item-section"].value
      });
    }
  
    data["img"] = "systems/wfrp3/icons/blank.png";
    data["name"] = `New ${data.type.capitalize()}`;
    this.actor.createEmbeddedEntity("OwnedItem", data);
  }
  
  duplicateItem(itemId)
  {
    let item = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
    this.actor.createEmbeddedEntity("OwnedItem", item);
  }
}

Actors.unregisterSheet("core", ActorSheet);

Hooks.on("popout:renderSheet", (sheet) => {
  sheet.element.css({ width: "650px", height: "850px", padding: "0px"})
})
