//
//  FeedingHabitsViewController.swift
//  firstbite
//
//  Created by Leon Trieu on 2018-07-17.
//  Copyright © 2018 Healthy7. All rights reserved.
//

import Foundation
import UIKit
import FirebaseFirestore

class FeedingHabitsViewController: UITableViewController {
    
    var fstore: Firestore!
    var collectionName = ""
    var documentName = ""
    var article = ""
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        fstore = Firestore.firestore()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    //    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    //        self.performSegue(withIdentifier: "solidFoodSegue", sender: nil)
    //    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?){
        let articleView:SolidFoodArticleViewController = segue.destination as! SolidFoodArticleViewController
        var regularText = ""

        
        switch segue.identifier {
        case "fh_6to9"? :
            collectionName = "Guide"
            documentName = "Feeding Habits"
            article = "Feeding Habits: 6-9mo"
            break
        case "fh_9to12"? :
            collectionName = "Guide"
            documentName = "Feeding Habits"
            article = "Feeding Habits: 9-12mo"
            break
        case "fh_12to24"? :
            collectionName = "Guide"
            documentName = "Feeding Habits"
            article = "Feeding Habits: 12-24mo"
            break
        case "fh_24to36"? :
            collectionName = "Guide"
            documentName = "Feeding Habits"
            article = "Feeding Habits: 24-36mo"
            break
        case "chokinghazard"? :
            collectionName = "Guide"
            documentName = "Feeding Habits"
            article = "Choking Hazards"
            break
        default : break
        }
        
        let docRef =  fstore.collection(collectionName).document(documentName)
        docRef.getDocument(completion:{(snapshot, error) in
            if let document = snapshot?.data() {
                regularText = document[self.article] as! String
            }
            articleView.setText(t:regularText)
            articleView.setTitle(t:self.article)
        })
        
    }
}

