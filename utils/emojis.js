const tokenList = {
	Christmas: "<a:christmastoken:916392876475289661>",
	Halloween: "<a:halloween_token_big:893946799872688168>",
	Fall: "<a:falltoken_gif:883785431538364467>",
	Spring: "", // Spring event doesn't have an emoji on the discord
	// Might use the summer token if they don't add one by Spring
	Summer: "<a:summer_token_gif:876204768270364712>",
	Autumn: "<:autumntoken:883775113168834581>", // Only one that isn't a gif ...
	Winter: "<a:wintertoken_gif:906586240592265216>",
};

// ################################################################################################################
// # If you use this compiled emoji list. Please credit Mineclub Link and link back to here in your code and repo #
// ################################################################################################################
const emojiList = {
	// Gem emotes
	gem_10k: "<:gem_10k:837390660705320993>",
	gem_100k: "<:gem_100k:837390660926570608>",
	Gem_100: "<:Gem_100:837390660952653844>",
	gem_1k: "<:gem_1k:837390660968513607>",
	gem_1m: "<:gem_1m:837390661094211644>",

	// Emojis from Discord server for conversion
	ꍛ: "<:excited:796733687307567127>",
	ꍏ: "<:nervous:796733775798206484>",
	ꍐ: "<:grin:796733989360369664>",
	ꌸ: "<:sweat:796734634838196253>",
	ꌽ: "<:tongue_out:796734698268131329>",
	ꌾ: "<:tongue_wink:796734698607869982>",
	ꌼ: "<:smooch:796734778510016552>",
	ꍊ: "<:flushed:796735287434280980>",
	ꍆ: "<:tear:796735479994384414>",
	ꍒ: "<:shocked:796736307719962714>",
	ꍓ: "<:dead:796736307724419112>",
	ꍈ: "<:mad:796736516717412352>",
	섰: "<:scared:796736516734844948>",
	ꍍ: "<:fearful:796736543866880051>",
	ꍜ: "<:broken_heart:796789873583456266>",
	ꍘ: "<:clown:796789873603379261>",
	ꍙ: "<:poop:796789873650040912>",
	鄒: "<:thumbs_up:797580224220364821>",
	鄁: "<:cake:797580224371490827>",
	鄐: "<:think:797580224397180958>",
	鄗: "<:donut:797580224413302804>",
	鄓: "<:thumbs_down:797580224526549033>",
	鄔: "<:star:797580224753041458>",
	胍: "<:earth:803357302777839617>",
	膊: "<:dice:803357302782427138>",
	鄘: "<:star_eyes:803357302907207691>",
	胧: "<:check:803357302911926283>",
	见: "<:ice_cube:803357302941679627>",
	股: "<:smirk:803357302946136104>",
	胈: "<:cross:803357302949543976>",
	貘: "<:music_note:803357302986899506>",
	胜: "<:guitar:803357303004463195>",
	氍: "<:sun:803357303037493298>",
	朘: "<:wave:803357303042474064>",
	豹: "<:unamused:803357303058595920>",
	塍: "<:coffee:803357303062921236>",
	縢: "<:peace:803357303070785536>",
	鄚: "<:sleepy:803357303117316146>",
	螣: "<:rose:803357303150739516>",
	肚: "<:ok:803357303171448833>",
	胝: "<:snowman:803357303210377277>",
	赭: "<:apple:825112761968754779>",
	炆: "<:bang:825112852255342592>",
	熇: "<:bear:825112865928249345>",
	壹: "<:brb:825112892176465971>",
	燧: "<:candle:825112933699944449>",
	塮: "<:cap:825112947289358388>",
	增: "<:chart_down:825112993833943060>",
	邽: "<:chart_up:825113005661618176>",
	郝: "<:chili:825113018173751326>",
	坍: "<:clap:825113029560500295>",
	堤: "<:cookie:825113053347315713>",
	声: "<:cupcake:825113077338734643>",
	坦: "<:derp:825113090760245290>",
	垛: "<:detective:825113104013983824>",
	垙: "<:dog:825113130651615273>",
	块: "<:elf:825113188243996683>",
	墁: "<:eye_roll:825113238467117086>",
	塅: "<:fish:825113605560074281>",
	埤: "<:flower:825113640582905889>",
	墙: "<:lollipop:825133925314592778>",
	煨: "<:lotus:825133937239785502>",
	去: "<:microphone:825133963747917875>",
	坡: "<:money_bag:825133996173951047>",
	赧: "<:monkey:825134014943068180>",
	磬: "<:moon:825134026520002571>",
	悫: "<:mouse:825134042114031617>",
	埫: "<:octopus:825134077476077602>",
	垢: "<:old:825134088322678794>",
	坥: "<:panda:825134113497153596>",
	縠: "<:party:825134131331465231>",
	圭: "<:peel:825134150154846259>",
	垾: "<:pencil:825134165204140062>",
	垚: "<:pizza:825134177741570078>",
	堎: "<:pog:825134192874225664>",
	壳: "<:popcorn:825134209089273886>",
	馨: "<:princess:825134238549409812>",
	炕: "<:salt:825134266420690984>",
	卦: "<:shout:825134305113145355>",
	垌: "<:shrug:825134317747175465>",
	数: "<:skateboard:825134334499225621>",
	焞: "<:sneeze:825134347451236369>",
	耀: "<:snowflake:825134360440340530>",
	坻: "<:soccer:825134396101230602>",
	坰: "<:storm:825134458247053312>",
	款: "<:sweat:825134485221408839>",
	赫: "<:swords:825134499116875818>",
	冉: "<:tearful:825134512556081182>",
	丧: "<:timer:825134525423943750>",
	啬: "<:trash:825134555164967003>",
	埒: "<:tree:825134567370653776>",
	埠: "<:umbrella:825134582788915210>",
	鼙: "<:mineclub:827293117224976416>",
	圻: "<:volleyball:827293137512693800>",
	宀: "<:basketball:840339931331035166>",
	盚: "<:boxing_glove:840339990093496400>",
	麽: "<:castle:840340030529863690>",
	摩: "<:french_fries:840340063904858174>",
	昶: "<:gas_tank:840340078319501352>",
	"、": "<:ice_cream:840340099723296819>",
	丶: "<:jetpack:840340112390488064>",
	磨: "<:kiwi:840340131557933096>",
	裘: "<:leaf:840340150110257183>",
	塱: "<:palm_tree:840340234624696320>",
	舲: "<:teddy_bear:840340422139576351>",
	禧: "<:speaker:840340422172606495>",
	簇: "<:yoyo:840340422471450634>",
	篙: "<:yawn:840340422508675092>",
	能: "<:rubix_cube:840340422622445598>",
	ꍉ: "<a:angry_gif:870041170846298182>",
	ꌿ: "<a:crazy_gif:870042189600788522>",
	爟: "<a:diamond_gif:870042189776977991>",
	ꍇ: "<a:cry_gif:870042189785354311>",
	烟: "<a:raged_gif:870042189865029644>",
	ꍝ: "<a:heart_gif:870042189869248543>",
	ꍕ: "<a:vomit_gif:870042189974106172>",
	ꍗ: "<a:devil_gif:870042189990858762>",
	ꌻ: "<a:heart_eyes_gif:870042190016032808>",
	ꍅ: "<a:wink_gif:870042190024421406>",
	爙: "<a:fuming_gif:870042190032818207>",
	榖: "<a:pride_gif:870042190057967636>",
	ꍁ: "<a:cool_gif:870042190070567052>",
	辉: "<a:arrow_down_gif:871944956170887180>",
	舀: "<a:alarm_gif:871944956330250281>",
	ꌶ: "<a:blush_gif:871944956451889163>",
	寺: "<a:airplane_gif:871944956485451837>",
	赪: "<a:burger_gif:871944956485464085>",
	坬: "<a:100_gif:871944956493844480>",
	垱: "<a:arrow_top_gif:871944956611276830>",
	坝: "<a:arrow_left_gif:871944956615483474>",
	舫: "<a:bubble_blower_gif:871944956669984859>",
	圹: "<a:frog_gif:871944956690956289>",
	焙: "<a:arrow_right_gif:871944956707754034>",
	舾: "<a:amongus_gif:871944956732907571>",
	ꍠ: "<a:ghost_gif:871944956753899551>",
	ꍄ: "<a:confounded_gif:871944956787445811>",
	坼: "<a:envy_gif:871944956791623750>",
	塌: "<a:exhausted_gif:871944956808409108>",
	ꍌ: "<a:cold_gif:871944956812611624>",
	鄿: "<a:clouds_gif:871944956816805888>",
	埌: "<a:cowboy_gif:871944956820983868>",
	ꍂ: "<a:disappointed_gif:871944956829397043>",
	社: "<a:eye_gif:871944956837773332>",
	鄀: "<a:fire_gif:871944956854562847>",
	熥: "<a:pacman:871944956858753045>",
	鄑: "<a:drool_gif:871944956867141642>",
	脯: "<a:gg_gif:871944956879728711>",
	鄕: "<a:eyes_gif:871944956904878080>",
	堋: "<a:finger_crossed_gif:871944956921643048>",
	ꍃ: "<a:sad_gif:871944956934242356>",
	壸: "<a:ez_gif:871944956934250536>",
	貂: "<a:gold_medal_gif:871944956959412256>",
	脏: "<a:nuclear_gif:871944956980371517>",
	焯: "<a:flex_gif:871944956992970792>",
	ꍋ: "<a:happy_gif:871944957018140713>",
	垎: "<a:fist_gif:871944957068460062>",
	书: "<a:lego_brick_gif:871944957081051146>",
	鄂: "<a:liar_gif:871944957085253662>",
	禅: "<a:loveable_gif:871944957102010458>",
	埘: "<a:injured_gif:871944957118795796>",
	ꌷ: "<a:joy_gif:871944957131362326>",
	ꍎ: "<a:neutral_gif:871944957139763280>",
	貆: "<a:content_gif:871944957173334037>",
	ꍖ: "<a:money_face_gif:871944957185896478>",
	脾: "<a:rain_gif:871944957219450890>",
	禔: "<a:notepad_gif:871944957236244530>",
	舷: "<a:bow_arrows_gif:871944957303353404>",
	ꍀ: "<a:raised_eyebrow_gif:871944957307535430>",
	鄖: "<a:rainbow_gif:871944957357862922>",
	冗: "<a:shush_gif:871944957366251600>",
	ꍞ: "<a:spooky_gif:871944957424963604>",
	煺: "<a:butterfly_gif:872218263210328065>",
	鸼: "<a:kite_gif:872218263399071765>",
	壶: "<a:gavel_gif:872218263508090952>",
	貊: "<a:medal_bronze_gif:872218263541653525>",
	媵: "<a:medal_silver_gif:872218263600377918>",
	墚: "<a:cat_gif:872218263642337380>",
	腴: "<a:crystalball_gif:872218263659094047>",
	貅: "<a:lips_gif:872218263659102268>",
	戈: "<a:camera_gif:872218263680061530>",
	盍: "<a:bee_gif:872218263722004572>",
	埸: "<a:moustache_gif:872218263747186788>",
	ꌵ: "<a:rocket_gif:872218263755558982>",
	翩: "<a:parrot_gif:872218263772332042>",
	黁: "<a:rollercoaster_gif:872218263856238634>",
	坋: "<a:sparkles_gif:872218263919140894>",
	ꍟ: "<a:robot_gif:872218263940128828>",
	腾: "<a:clock_gif:872218265961787482>",
	圲: "<a:stop_sign_gif:872219105925685278>",
	腯: "<a:cute_gif:872219105959219240>",
	卬: "<a:pancakes_gif:872219106185732126>",
	ꍢ: "<a:orange_heart_gif:873681466951864361>",
	ꍚ: "<a:skull_gif:873681466981236767>",
	封: "<a:8ball_gif:873681467035750410>",
	ꍥ: "<a:blue_heart_gif:873681467111268382>",
	鄙: "<a:blank_gif:873681467119665192>",
	甏: "<a:dollar_gif:873681467140603904>",
	煓: "<a:egg_gif:873681467140636702>",
	坂: "<a:facemask_gif:873681467157385246>",
	瞽: "<a:nerdy_gif:873681467174182912>",
	觳: "<a:CD_gif:873681467186745374>",
	艟: "<a:boat_gif:873681467186765864>",
	航: "<a:pokeball_gif:873681467186774026>",
	臜: "<a:car_gif:873681467195142195>",
	ꍤ: "<a:purple_heart_gif:873681467241299978>",
	垧: "<a:traffic_light_gif:873681467245477888>",
	脉: "<a:facepalm_gif:873681467304210442>",
	艚: "<a:zipped_gif:873681467325153321>",
	ꍡ: "<a:yellowheart_gif:873681467329355807>",
	姿: "<a:pride_heart_gif:873681467362902076>",
	舢: "<a:zombie_gif:873681467459371038>",
	ꍣ: "<a:green_heart_gif:873681467497127976>",
	赦: "<a:gift_gif:877932637614931978>",
	舱: "<a:vial_gif:877932637698809886>",
	舸: "<a:target_gif:877932637698818089>",
	灿: "<a:dragon_gif:878648826276245554>",
	爅: "<a:knife_fork_gif:878648826423038022>",
	ꌺ: "<a:upside_down_gif:878648826452381716>",
	咭: "<:candycane:916087247781109770>",
	叽: "<:bread:916445039188672513>",
	喀: "<:adorable:916445039234777129>",
	嘛: "<:alien:916445039251554415>",
	哌: "<:article:916445039268343819>",
	唉: "<:boomer:916445039377391667>",
	喹: "<:bulldog:916445039452897311>",
	唾: "<:ace:916445039528378378>",
	咕: "<:cleopatra:916445039549362217>",
	喃: "<:businessman:916445039553548428>",
	嗖: "<:astronaut:916445039612280882>",
	嗜: "<:chad:916445039624855622>",
	嗔: "<:blush_cat:916445039645851649>",
	啾: "<:bulb:916445039658401802>",
	嘧: "<:acoustic:916445039658422322>",
	嚏: "<:cobbler:916445039780061225>",
	嗐: "<:anchor:916445039977181214>",
	哱: "<:doctor:916445196793831445>",
	哓: "<:corpse:916445196860919808>",
	咙: "<:engraged:916445196865142814>",
	嗦: "<:cow:916445196873498704>",
	哺: "<:cutesy:916445196944814090>",
	兄: "<:coin:916445196957388851>",
	唣: "<:dripple:916445196957405265>",
	响: "<:halo:916445197649473538>",
	味: "<:halo_face:916445197716582421>",
	吮: "<:gamer:916445197724971068>",
	吠: "<:groovy:916445197745938522>",
	嚓: "<:hat:916445197808857118>",
	噢: "<:flowers:916445197863362601>",
	哮: "<:home:916445197909524480>",
	嘟: "<:graduate:916445197955653722>",
	呼: "<:fireworks:916445199478173787>",
	叶: "<:ramen:916445305728278529>",
	囔: "<:leprechaun:916445305837322240>",
	咤: "<:link:916445305858301962>",
	喤: "<:hot_pepper:916445305870909460>",
	嗥: "<:palm:916445305875071046>",
	吒: "<:oni:916445305879273533>",
	咦: "<:lol:916445305887653908>",
	听: "<:joker:916445305887662180>",
	哦: "<:pacifier:916445305891852368>",
	嘲: "<:mass_energy:916445305912819762>",
	吽: "<:lucky_block:916445305921212416>",
	嗅: "<:pumpkin:916445305933799444>",
	啤: "<:married:916445305933799505>",
	嘹: "<:masquerade:916445305963159572>",
	哞: "<:paintbrush:916445305979957328>",
	哝: "<:lightning:916445306101567588>",
	咱: "<:red_devil:916445398749556757>",
	呔: "<:sith:916445398904754186>",
	咍: "<:skull_mask:916483971548856411>",
	唏: "<:wink_tounge:916483971628552233>",
	咚: "<:tennis_ball:916483971737591849>",
	嘚: "<:single_cloud:916483971741802497>",
	唵: "<:turtle:916483971754369065>",
	戢: "<:wizard:916483971871801355>",
	咴: "<:samurai:916483971871813743>",
	吱: "<:sharpshooter:916483971876024380>",
	喷: "<:speak:916483971888586753>",
	喊: "<:snowhead:916483971892772874>",
	咏: "<:snuggle:916483971901181982>",
	噬: "<:ring:916483971913748540>",
	咯: "<:snapcard:916483971917963304>",
	嘭: "<:troll:916483971922161695>",
	咛: "<:wow:916483971926347786>",
	喧: "<:seaweed:916483971943104642>",
	噻: "<:sword:916483971951501363>",
	嘁: "<:water_bottle:916483971955707994>",
	呱: "<:water:916483971980853268>",
	唆: "<:world:916483972006051840>",
	哚: "<:weary:916483972207378432>",
	嘻: "<:santa:924041519063765122>",
	ꌹ: ":stuck_out_tongue_closed_eyes:",
	舡: ":partly_sunny:",
	艋: ":wrench:",
	艇: ":sushi:",
	艅: ":milk:",
	舴: ":flamingo:",
	虒: ":roll_of_paper:",
	舭: ":tomato:",
	炫: ":spider_web:",
	咎: ":unicorn:",
	舠: ":elephant:",
	堨: ":face_with_raised_eyebrow:",
	笠: ":key",
	艨: "'bee_hive'",
	艏: "'pinata'",
	垠: ":sandwich:",
	篱: ":pie:",
	ꍔ: ":nauseated_face:",
	舻: ":teapot:",
	良: ":sponge:",
	鵏: ":potted_plant:",
	郙: ":tooth:",
	廞: "'melted_happy'",
	床: "'harp'",
	术: ":no_entry_sign:",
	麻: ":ping_pong:",
	糜: "'firstaid'",
	罄: ":shark:",
	麾: ":thermometer:",
	魔: "'bird_house'",
	靡: ":roller_skate:",
	恚: ":champagne_glass:",
	垍L: ":balloon:",
	皴: ":yin_yang:",
	貔: ":trumpet:",
	肌: ":football:",
	圫: ":person_running:",
};


/**
 *
 * @param {String} input The character used by Mineclub resource pack
 * @return {String} Discord emoji
 */
function emojiConvert(input) {
	return emojiList[input];
}


/* eslint-disable no-magic-numbers */
function gemEmoji(amount) {
	if (amount < 1000) {
		return emojiList.gem100;
	} else if (amount < 10000) {
		return emojiList.gem1k;
	} else if (amount < 100000) {
		return emojiList.gem10k;
	} else if (amount < 1000000) {
		return emojiList.gem100k;
	}
	return emojiList.gemmil;
}
/* eslint-enable no-magic-numbers */


module.exports = { tokenList, emojiList, emojiConvert, gemEmoji };