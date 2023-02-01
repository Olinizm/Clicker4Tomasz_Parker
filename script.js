
        var castle = {
            name: "castle",
            level: 1,
            wood_req: 100,
            planks_req: 0,
            stone_req: 80,
            gold_req: 200,
            upgrade: function() {
                if (wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4 || gold < this.gold_req)
                {
                    return;
                }
                this.level++;
                post_upgrade(this)
                document.getElementById("castle_level").innerHTML = "Kingdom lvl "+this.level;
                document.getElementById("castle").src = "assets/castle/zamek"+this.level+".png";
                this.gold_req *= this.level;
                this.gold_req += 400;
                this.wood_req = 0;
                this.stone_req *= 4;
                this.planks_req = this.planks_req *2 + 200;
                upgrademats_update(this);
            }
            
        }

        var wood = {
            name: "wood",
            building: "drwal",
            amount: 0,
            level: 1,
            workers: 0,
            wood_req: 40,
            planks_req: 0,
            stone_req: 40,
            gold_req: 0,
            castle_req: 1,
            chop: function() {
                this.amount += this.level;
                stock_update(this);
            },
            upgrade: function() {
                if (castle.level < this.castle_req || wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4)
                {
                    return;
                }
                this.level++;
                this.castle_req++;
                post_upgrade(this);
                this.wood_req *= 2;
                this.stone_req *= 2;
                this.planks_req += 40;
                upgrademats_update(this);
            }
        };
        var stone = {
            name: "stone",
            building: "kamieniolom",
            amount: 0,
            level: 1,
            workers: 0,
            wood_req: 60,
            stone_req: 80,
            planks_req: 0,
            gold_req: 0,
            castle_req: 1,
            mine: function() {
                this.amount += this.level;
                stock_update(this);
            },
            upgrade: function() {
                if (wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4)
                {
                    return;
                }
                this.level++;
                this.castle_req++;
                post_upgrade(this);
                this.wood_req = 0;
                this.stone_req *= 2;
                this.planks_req = this.planks_req * 3 + 60;
                upgrademats_update(this);
            }
        };

        var fish = {
            name: "fish",
            building: "rybak",
            amount: 0,
            level: 1,
            workers: 1,
            wood_req: 60,
            stone_req: 0,
            planks_req: 40,
            gold_req: 0,
            castle_req: 1,
            upgrade: function() {
                if (wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4)
                {
                    return;
                }
                this.level++;
                this.castle_req++;
                post_upgrade(this);
                this.wood_req += 40;
                this.planks_req *= 2;
                upgrademats_update(this);
            }
            
        };
        
        var marble = {
            name: "marble",
            building: "marmurolom",
            amount: 0,
            level: 1,
            workers: 0,
            wood_req: 0,
            planks_req: 80,
            stone_req: 120,
            gold_req: 0,
            castle_req: 2,
            marmine: function() {
                this.amount += this.level;
                stock_update(this);
            },
            upgrade: function() {
                if (wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4)
                {
                    return;
                }
                this.level++;
                this.castle_req++;
                post_upgrade(this);
                this.stone_req *= 3;
                this.planks_req = this.planks_req*2 + 40;
                upgrademats_update(this);
            }
        };
        var planks = {
            name: "planks",
            building: "tartakigla",
            amount: 0,
            level: 1,
            workers: 0,
            wood_req: 80,
            stone_req: 100,
            planks_req: 40,
            gold_req: 0,
            castle_req: 1,
            make: function() {
                if (wood.amount<1)
                    return;
                this.amount += this.level;
                wood.amount--;
                stock_update(this);
                stock_update(wood);
            },
            upgrade: function() {
                if (wood.amount < this.wood_req || stone.amount < this.stone_req || planks.amount < this.planks_req || this.level == 4)
                {
                    return;
                }
                this.level++;
                this.castle_req++;
                post_upgrade(this);
                this.wood_req *= 2;
                this.stone_req *= 2;
                this.planks_req += 120;
                upgrademats_update(this);
            }
        };

        
        //recalculates and displays the currently owned materials after an upgrade
        function post_upgrade(resource)
        {
            wood.amount -= resource.wood_req;
            stone.amount -= resource.stone_req;
            planks.amount -= resource.planks_req;
            if (resource.name != "castle")
                level_update(resource);
            stock_update(wood);
            stock_update(stone);
            stock_update(planks);
        }
        function upgrademats_update(resource)
        {
            var mats = "";
            //we check if a certain resuorce is needed so we can add it's picture to display
            if (resource.wood_req > 0)
            {
                mats += resource.wood_req + "<img height='15px' src='assets/resources/wood.png'>";
            }
            if (resource.stone_req > 0)
            {
                mats += resource.stone_req + "<img height='15px' src='assets/resources/kamien.png'>";
            }
            if (resource.planks_req > 0)
            {
                mats += resource.planks_req + "<img height='15px' src='assets/resources/deski.png'>";
            }
            if (resource.gold_req > 0)
            {
                mats += resource.gold_req + "<img height='15px' src='assets/resources/monety.png'>";
            }
            document.getElementById(resource.name+"_upmats").innerHTML = mats;

            if (resource.name == "castle")
            {
                //castle doesn't have castle requirements so we don't modify it
                //instead when it reaches max level we display it over the required mats
                if (resource.level == 4)
                    document.getElementById(resource.name+"_upmats").innerHTML = "max upgrade reached";
                return;
            }
            if (resource.level == 4 || resource.name == "marble" && resource.level == 3)
            {
                //the max upgrade message is displayed over the castle requirements, while mats are cleared
                document.getElementById(resource.name+"_castle").innerHTML = "max upgrade reached";
                document.getElementById(resource.name+"_upmats").innerHTML = "";
                return;
            }
            
            document.getElementById(resource.name+"_castle").innerHTML = "requires castle lvl "+ resource.castle_req;
        }

        function level_update(resource)
        {
            if (resource.level == 4 || resource.name == "marble" && resource.level == 3)
            {
                //level 4 is the max level of every building except for marble mason
                document.getElementById(resource.name+"_level").innerHTML = "MAX lvl";
                document.getElementById(resource.name+"_level2").innerHTML = "MAX lvl";
            }
            else
            {
                document.getElementById(resource.name+"_level").innerHTML = "lvl "+resource.level;
                document.getElementById(resource.name+"_level2").innerHTML = "lvl "+resource.level;
            }

            if (resource.name == "fish")
            {
                //you can't fish manualy
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+((resource.level+1)*resource.workers)+"/turn";
            }
            else if (resource.name == "planks")
            {
                //planks have extra convertion line we need to change
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+resource.level+"/click, "+((resource.level+1)*resource.workers)+"/turn";
                document.getElementById(resource.name+"_level4").innerHTML = resource.level+" planks";
            }
            else
            {
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+resource.level+"/click, "+((resource.level+1)*resource.workers)+"/turn";
            }
            //changing the building when upgraded
            var buildpath = "assets/"+resource.building+"/"+resource.building+resource.level+".png";
            document.getElementById(resource.building).src = buildpath;
        }
        //updates the displayed amount of the resource passed in
        function stock_update(resource)
        {
            document.getElementById(resource.name+"_amount").innerHTML = resource.amount;
            document.getElementById(resource.name+"_stock").innerHTML = "stock: "+resource.amount;
        }

        //function to recalculate resources every 2 seconds
        function turnend()
        {
            turnworkers(fish);
            turnworkers(wood);
            turnworkers(stone);
            turnworkers(planks);
            turnworkers(marble);
            gold += (workers*5);
            document.getElementById("money").innerHTML = "treasury: " + gold + "<img height='15px' src='assets/resources/monety.png'>";
            fish.amount -= workers;
            stock_update(fish);
            //checks if you're starving people (but seriously don't starve people)
            if (fish.amount < 0)
            {
                alert("you were overthrown by your people, apparently food is necessary for survival");
                document.location.reload();
            }
        }

        //adding resources based on workers
        function turnworkers(type)
        {
            type.amount += type.workers * (type.level+1);
            stock_update(type);
            
        }
        //function called when hiring worker, updates variables and workers displayed
        function addworkers(resource)
        {
            if (gold < 100)
            {
                return;
            }
            gold -= 100;
            workers++;
            document.getElementById("workers").innerHTML = "workers: "+workers;
            resource.workers++;
            document.getElementById(resource.name+"_workers").innerHTML = resource.workers;
            document.getElementById(resource.name+"_workers2").innerHTML = "workers: "+resource.workers;
            //updating resource per turn
            if (resource.name == "fish")
            {
                //you can't fish manualy
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+((resource.level+1)*resource.workers)+"/turn";
            }
            else if (resource.name == "planks")
            {
                //planks have extra convertion line we need to change
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+resource.level+"/click, "+((resource.level+1)*resource.workers)+"/turn";
                document.getElementById(resource.name+"_level4").innerHTML = resource.level+" planks";
            }
            else
            {
                document.getElementById(resource.name+"_level3").innerHTML = "production: "+resource.level+"/click, "+((resource.level+1)*resource.workers)+"/turn";
            }
        }
        //changes active page leaving the nav untouched
        function openpage(change)
        {
            document.getElementById(active_page).style.display = "none";
            document.getElementById(change).style.display = "block";
            active_page = change;
        }
        //changes the building escription on the right
        function buildingpage(change)
        {
            document.getElementById(active_building).style.display = "none";
            document.getElementById(change).style.display = "block";
            active_building = change;
        }
        function code_redeem(frm)
        {
            if (frm.code.value == "motherlode")
            {
                gold += 50000;
                frm.code.value = "code redeemed";
            }
            else
            {
                frm.code.value = "invalid code";
            }
        }
